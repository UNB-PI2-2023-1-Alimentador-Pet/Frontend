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
  ButtonText,
} from '../../../components/Buttons';

import {useUser} from '../../../hooks/user';
import {createUser} from '../../../services/user';
import {getJWTfromCookie} from '../../../utils/consts';

const Register = () => {
  const {storeUser} = useUser();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nomeInput = useRef();
  const emailInput = useRef();
  const senhaInput = useRef();

  const handleCreate = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const user = {
      nome,
      email,
      senha,
      // userHash: 'oI3Q2',
    };

    if (!nome || !email || !senha) {
      setIsLoading(false);
      Alert.alert('Preencha todos os campos');
      return;
    }

    const response = await createUser(user);

    setIsLoading(false);

    if (response.status === 201) {
      const token = getJWTfromCookie(response.headers['set-cookie']);
      storeUser(response.data, token);
    } else {
      Alert.alert('Erro ao criar conta');
    }
  };

  return (
    <ScreenContainer>
      <ScrollArea>
        <ContentContainer>
          <Title>Registrar</Title>
        </ContentContainer>

        <ContentContainer>
          <InputPrimary
            ref={nomeInput}
            placeholder="Nome"
            maxLength={100}
            onChangeText={text => setNome(text)}
            onSubmitEditing={() => emailInput.current?.focus()}
            returnKeyType="next"
          />
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
            secureTextEntry
            maxLength={100}
            onChangeText={text => setSenha(text)}
            returnKeyType="done"
          />

          <ButtonWrapper>
            <ButtonPrimary onPress={() => handleCreate()}>
              <ButtonText>Criar conta</ButtonText>
            </ButtonPrimary>
          </ButtonWrapper>
        </ContentContainer>
      </ScrollArea>

      <LoadingModal visible={isLoading} />
    </ScreenContainer>
  );
};

export default Register;
