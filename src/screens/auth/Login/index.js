import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';

import {Container} from './styles';
import {ScrollViewStyled, InputText, Title} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

import {useUser} from '../../../hooks/user';
import {authUser} from '../../../services/user';
import {getJWTfromCookie} from '../../../utils/consts';

const Login = ({navigation}) => {
  const {storeUser} = useUser();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const emailInput = useRef();
  const senhaInput = useRef();

  const handleLogin = async () => {
    Keyboard.dismiss();

    const user = {
      email,
      senha,
    };

    if (!email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const response = await authUser(user);

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
    <Container>
      <ScrollViewStyled>
        <Title>Entrar</Title>

        <InputText
          ref={emailInput}
          placeholder="E-mail"
          keyboardType="email-address"
          maxLength={100}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => senhaInput.current?.focus()}
          returnKeyType="next"
        />
        <InputText
          ref={senhaInput}
          placeholder="Senha"
          maxLength={100}
          secureTextEntry
          onChangeText={text => setSenha(text)}
          onSubmitEditing={() => handleLogin()}
          returnKeyType="done"
        />

        <ButtonPrimary onPress={() => handleLogin()}>
          <ButtonText>Entrar</ButtonText>
        </ButtonPrimary>

        <ButtonPrimary onPress={() => navigation.navigate('LostPassword')}>
          <ButtonText>Esqueci a senha</ButtonText>
        </ButtonPrimary>
      </ScrollViewStyled>
    </Container>
  );
};

export default Login;
