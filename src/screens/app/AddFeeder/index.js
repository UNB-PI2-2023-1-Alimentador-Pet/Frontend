import React, {useEffect, useCallback, useState} from 'react';
import {StatusBar, PermissionsAndroid, TouchableOpacity} from 'react-native';
import {CircleNotch, WifiHigh} from 'phosphor-react-native';
import WifiManager from 'react-native-wifi-reborn';

import Item from '../../../components/Item';
import {ScreenContainer, Content} from './styles';
import {
  ScrollArea,
  Tooltip,
  TooltipIconWrapper,
  TooltipTextWrapper,
  TooltipText,
  SubTitleSecondary,
} from '../../../components/Defaults';
import Spinner from '../../../components/Spinner';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

const AddFeeder = ({navigation}) => {
  const [wifiEnabled, setWifiEnabled] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [currentWifiSSID, setCurrentWifiSSID] = useState('');

  const getCurrentWifiSSID = async () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
        setCurrentWifiSSID(ssid);
      },
      e => {
        console.log('Cannot get current SSID!', e);
      },
    );
  };

  const tryToConnectFeeder = ssid => {
    WifiManager.connectToProtectedSSID(ssid, '12345678', false, false).then(
      () => {
        console.warn('Connected successfully!');
        navigation.navigate('SendData', {ssid: currentWifiSSID});
      },
      e => {
        console.warn('Connection failed!', e);
      },
    );
  };

  const getWifiList = useCallback(async () => {
    const wifiArray = await WifiManager.reScanAndLoadWifiList();
    const filtered = wifiArray.filter(wifi => wifi.SSID.includes('MiAuFeeder'));
    setWifiList(filtered);
  }, []);

  useEffect(() => {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    setWifiEnabled(true);
  }, []);

  useEffect(() => {
    if (!wifiEnabled) {
      return;
    }

    const wifiJob = setInterval(() => {
      getWifiList();
    }, 3 * 1000);

    getCurrentWifiSSID();
    return () => {
      clearInterval(wifiJob);
    };
  }, [getWifiList, wifiEnabled]);

  return (
    <ScreenContainer>
      <ScrollArea>
        <StatusBar backgroundColor={colors.light} barStyle="dark-content" />
        {wifiEnabled ? (
          <TouchableOpacity onPress={() => getWifiList()}>
            <Tooltip>
              <TooltipIconWrapper>
                <Spinner>
                  <CircleNotch
                    color={colors.primary}
                    weight="duotone"
                    size={scale(22)}
                  />
                </Spinner>
              </TooltipIconWrapper>

              <TooltipTextWrapper>
                <TooltipText>
                  Procurando dispositivos próximos. Verifique se o novo
                  dispositivo está no modo de pareamento.
                </TooltipText>
              </TooltipTextWrapper>
            </Tooltip>
          </TouchableOpacity>
        ) : (
          <Tooltip>
            <TooltipIconWrapper>
              <WifiHigh
                color={colors.primary}
                weight="regular"
                size={scale(22)}
              />
            </TooltipIconWrapper>

            <TooltipTextWrapper>
              <TooltipText>Ative o WiFi</TooltipText>
            </TooltipTextWrapper>
          </Tooltip>
        )}

        <Content>
          <SubTitleSecondary>Dispositivos encontrados</SubTitleSecondary>
          {wifiList.map(wifi => (
            <Item
              key={wifi.BSSID}
              image={require('../../../assets/imgs/alimentador.png')}
              title={wifi.SSID}
              onPress={() => tryToConnectFeeder(wifi.SSID)}
              gray
            />
          ))}
        </Content>
      </ScrollArea>
    </ScreenContainer>
  );
};

export default AddFeeder;
