import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';

import LoadingModal from '../../../components/LoadingModal';
import {
  ScreenContainer,
  ScrollArea,
  ContentContainer,
  Title,
} from '../../../components/Defaults';
import {InputPrimary} from '../../../components/Inputs';
import {
  ButtonWrapper,
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';

import {useUser} from '../../../hooks/user';
import {authUser} from '../../../services/user';
import {getJWTfromCookie} from '../../../utils/consts';

const Login = ({navigation}) => {
  const {storeUser} = useUser();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const senhaInput = useRef();

  const handleLogin = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const user = {
      email,
      senha,
    };

    if (!email || !senha) {
      setIsLoading(false);
      Alert.alert('Preencha todos os campos');
      return;
    }

    const response = await authUser(user);

    setIsLoading(false);

    if (response.status === 201) {
      const token = getJWTfromCookie(response.headers['set-cookie']);
      storeUser(response.data, token);
    } else if (response.status === 401) {
      Alert.alert('E-mail ou senha incorretos');
    } else {
      Alert.alert('Algum erro ocorreu, tente novamente mais tarde');
    }
  };

  return (
    <ScreenContainer>
      <ScrollArea>
        <ContentContainer>
          <Title>Entrar</Title>
        </ContentContainer>

        <ContentContainer>
          <InputPrimary
            ref={emailInput}
            placeholder="E-mail"
            keyboardType="email-address"
            maxLength={100}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => senhaInput.current?.focus()}
            returnKeyType="next"
          />
          <InputPrimary
            ref={senhaInput}
            placeholder="Senha"
            maxLength={100}
            secureTextEntry
            onChangeText={text => setSenha(text)}
            onSubmitEditing={() => handleLogin()}
            returnKeyType="done"
          />
        </ContentContainer>

        <ContentContainer>
          <ButtonWrapper>
            <ButtonPrimary onPress={() => handleLogin()}>
              <ButtonText>Entrar</ButtonText>
            </ButtonPrimary>

            <ButtonSecondary
              onPress={() => navigation.navigate('LostPassword')}>
              <ButtonText>Esqueci a senha</ButtonText>
            </ButtonSecondary>
          </ButtonWrapper>
        </ContentContainer>
      </ScrollArea>

      <LoadingModal visible={isLoading} />
    </ScreenContainer>
  );
};

export default Login;
