import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Container} from './styles';
import {ScrollViewStyled, InputText} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';
import {colorsLight} from '../../../utils/colors';

import {useUser} from '../../../hooks/user';
import {
  sendWiFiData,
  getDeviceStatus,
  restartDevice,
} from '../../../services/device';

const SendData = ({navigation, route}) => {
  const {user, devices, storeDevices} = useUser();
  const {ssid} = route.params;

  const [nome, setNome] = useState(ssid);
  const [senha, setSenha] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const nomeInput = useRef();
  const senhaInput = useRef();

  const restartAlimentador = async () => {
    const response = await restartDevice();

    if (response.status === 200) {
      Alert.alert('Alimentador adicionado com sucesso');
      const newDevice = {
        id: 1,
        nome: 'Alimentador 1',
        status: 'connected',
      };
      storeDevices([...devices, newDevice]);
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro ao reiniciar alimentador');
    }
  };

  const getStatus = async () => {
    let connected = true;

    while (connected) {
      const response = await getDeviceStatus();

      console.warn(response.data);

      if (response.status === 200) {
        if (response.data.status === 'connected') {
          connected = false;
          restartAlimentador();
        } else if (response.data.status === 'fail') {
          Alert.alert('Digite a senha do Wifi novamente');
          connected = false;
        }
      } else {
        Alert.alert('Erro ao obter status');
        connected = false;
        break;
      }
    }
  };

  const handleSend = async () => {
    Keyboard.dismiss();

    const wifi = {
      ssid: nome,
      password: senha,
      user_hash: user.userHash,
    };

    const response = await sendWiFiData(wifi);
    console.warn(response);

    if (response.status === 200) {
      getStatus();
    } else {
      Alert.alert('Erro ao enviar dados');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorsLight.light}}>
      <Container>
        <ScrollViewStyled>
          <InputText
            ref={nomeInput}
            placeholder="SSID"
            maxLength={100}
            value={nome}
            onChangeText={text => setNome(text)}
            onSubmitEditing={() => senhaInput.current?.focus()}
            returnKeyType="next"
          />
          <InputText
            ref={senhaInput}
            placeholder="Senha"
            secureTextEntry
            maxLength={100}
            value={senha}
            onChangeText={text => setSenha(text)}
            returnKeyType="done"
          />

          <ButtonPrimary onPress={() => handleSend()}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>
        </ScrollViewStyled>
      </Container>
    </SafeAreaView>
  );
};

export default SendData;
