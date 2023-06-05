import React, {useEffect, useCallback, useState} from 'react';
import {PermissionsAndroid, TouchableOpacity} from 'react-native';
import {CircleNotch, WifiHigh} from 'phosphor-react-native';
import WifiManager from 'react-native-wifi-reborn';

import {Container, Content} from './styles';
import {
  ScrollViewStyled,
  Item,
  ItemTitle,
  Tooltip,
  TooltipIconWrapper,
  TooltipTextWrapper,
  TooltipText,
  SubTitleSecondary,
} from '../../../components/Defaults';
import Spinner from '../../../components/Spinner';
import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

const AddDevice = ({navigation}) => {
  const [wifiEnabled, setWifiEnabled] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [currentWifiSSID, setCurrentWifiSSID] = useState('');

  const getCurrentWifiSSID = async () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
        setCurrentWifiSSID(ssid);
      },
      () => {
        console.log('Cannot get current SSID!');
      },
    );
  };

  const tryToConnectDevice = ssid => {
    console.log('try to connect to', ssid);
    WifiManager.connectToProtectedSSID(ssid, '12345678', false, false).then(
      s => {
        console.warn('Connected successfully!', s);
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
    <Container>
      <ScrollViewStyled>
        {wifiEnabled ? (
          <TouchableOpacity onPress={() => getWifiList()}>
            <Tooltip>
              <TooltipIconWrapper>
                <Spinner>
                  <CircleNotch
                    color={colorsLight.primarycolor}
                    weight="fill"
                    size={scale(24)}
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
                color={colorsLight.primarycolor}
                weight="regular"
                size={scale(28)}
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
            <TouchableOpacity
              key={wifi.SSID}
              onPress={() => tryToConnectDevice(wifi.SSID)}>
              <Item>
                <ItemTitle>{wifi.SSID}</ItemTitle>
              </Item>
            </TouchableOpacity>
          ))}
        </Content>
      </ScrollViewStyled>
    </Container>
  );
};

export default AddDevice;
