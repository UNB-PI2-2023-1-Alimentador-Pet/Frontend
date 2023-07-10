import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import LoadingModal from '../../../components/LoadingModal';
import {
  ScreenContainer,
  ScrollArea,
  ContentContainer,
} from '../../../components/Defaults';
import {InputPrimary} from '../../../components/Inputs';
import {
  ButtonWrapper,
  ButtonPrimary,
  ButtonText,
} from '../../../components/Buttons';
import {colors} from '../../../utils/colors';

import {useUser} from '../../../hooks/user';
import {sendWiFiData, getStatus, restart} from '../../../services/feeder';

const SendData = ({navigation, route}) => {
  const {user, feeders, storeFeeders} = useUser();
  const {ssid} = route.params;

  const [nome, setNome] = useState(ssid);
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nomeInput = useRef();
  const senhaInput = useRef();

  const restartFeeder = async () => {
    setIsLoading(true);

    const response = await restart();

    setIsLoading(false);

    if (response.status === 200) {
      Alert.alert('Alimentador adicionado com sucesso');
      const newFeeder = {
        id: 1,
        nome: 'MiAuFeeder-0001',
        status: 'connected',
      };
      storeFeeders([...feeders, newFeeder]);
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Erro ao reiniciar',
        'Tente reiniciar o dispositivo manualmente.',
      );
    }
  };

  const getFeederStatus = async () => {
    setIsLoading(true);
    let requests = 0;

    while (requests < 100) {
      const response = await getStatus();

      console.warn(response.data);

      if (response.status === 200) {
        if (response.data.status === 'connecting') {
          requests = 100;
          restartFeeder();
        } else if (response.data.status === 'fail') {
          setIsLoading(false);
          Alert.alert(
            'Algo deu errado',
            'Digite a senha da rede WiFi novamente ou troque de rede.',
          );
          requests = 100;
        }
      } else {
        setIsLoading(false);
        Alert.alert(
          'Erro ao obter status',
          'Tente conectar o dispositivo novamente.',
        );
        requests = 100;
      }
      requests += 1;
    }
  };

  const handleSend = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const wifi = {
      ssid: nome,
      password: senha,
      user_hash: user.userHash,
    };

    const response = await sendWiFiData(wifi);
    console.warn(response);

    if (response.status === 200) {
      getFeederStatus();
    } else {
      setIsLoading(false);
      Alert.alert(
        'Erro ao enviar dados',
        'Tente conectar ao dispositivo novamente.',
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.light}}>
      <ScreenContainer>
        <ScrollArea>
          <ContentContainer>
            <InputPrimary
              ref={nomeInput}
              placeholder="SSID"
              maxLength={100}
              value={nome}
              onChangeText={text => setNome(text)}
              onSubmitEditing={() => senhaInput.current?.focus()}
              returnKeyType="next"
            />
            <InputPrimary
              ref={senhaInput}
              placeholder="Senha"
              secureTextEntry
              maxLength={100}
              value={senha}
              onChangeText={text => setSenha(text)}
              returnKeyType="done"
            />
          </ContentContainer>

          <ContentContainer>
            <ButtonWrapper>
              <ButtonPrimary onPress={() => handleSend()}>
                <ButtonText>Salvar</ButtonText>
              </ButtonPrimary>
            </ButtonWrapper>
          </ContentContainer>
        </ScrollArea>

        <LoadingModal visible={isLoading} />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default SendData;
