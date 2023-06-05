import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';

import {Container} from './styles';
import {ScrollViewStyled, InputText, Title} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

import {useUser} from '../../../hooks/user';
import {createUser} from '../../../services/user';
import {getJWTfromCookie} from '../../../utils/consts';

const Register = () => {
  const {storeUser} = useUser();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const nomeInput = useRef();
  const emailInput = useRef();
  const senhaInput = useRef();

  const handleCreate = async () => {
    Keyboard.dismiss();

    const user = {
      nome,
      email,
      senha,
      // userHash: 'oI3Q2',
    };

    if (!nome || !email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const response = await createUser(user);

    if (response.status === 201) {
      const token = getJWTfromCookie(response.headers['set-cookie']);
      storeUser(response.data, token);
    } else {
      Alert.alert('Erro ao criar conta');
    }
  };

  return (
    <Container>
      <ScrollViewStyled>
        <Title>Registrar</Title>

        <InputText
          ref={nomeInput}
          placeholder="Nome"
          maxLength={100}
          onChangeText={text => setNome(text)}
          onSubmitEditing={() => emailInput.current?.focus()}
          returnKeyType="next"
        />
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
          secureTextEntry
          maxLength={100}
          onChangeText={text => setSenha(text)}
          returnKeyType="done"
        />

        <ButtonPrimary onPress={() => handleCreate()}>
          <ButtonText>Criar conta</ButtonText>
        </ButtonPrimary>
      </ScrollViewStyled>
    </Container>
  );
};

export default Register;
