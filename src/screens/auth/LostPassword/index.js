import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import LoadingModal from '../../../components/LoadingModal';
import {
  ScreenContainer,
  ScrollArea,
  ContentContainer,
  Title,
  StepText,
  SwiperContainer,
} from '../../../components/Defaults';
import {InputPrimary} from '../../../components/Inputs';
import {
  ButtonWrapper,
  ButtonPrimary,
  ButtonText,
} from '../../../components/Buttons';

import {changePassword, sendToken} from '../../../services/user';

const LostPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const emailInput = useRef();
  const tokenInput = useRef();
  const senhaInput = useRef();
  const confirmarSenhaInput = useRef();
  const swiper = useRef();
  const swiperPages = 2;

  const handleChangeUserPassword = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const user = {
      token,
      senha,
      confirmarSenha,
    };

    if (!token || !senha || !confirmarSenha) {
      setIsLoading(false);
      Alert.alert('Preencha todos os campos');
      return;
    } else if (senha.length < 8) {
      setIsLoading(false);
      Alert.alert('A senha deve ter no mínimo 8 caracteres');
      return;
    } else if (senha !== confirmarSenha) {
      setIsLoading(false);
      Alert.alert('As senhas não coincidem');
      return;
    }

    const response = await changePassword(user);

    setIsLoading(false);

    if (response.status === 200) {
      Alert.alert('Senha alterada com sucesso');
      navigation.navigate('Login');
    } else if (response.status === 400) {
      Alert.alert('Código de verificação incorreto ou expirado');
    } else {
      console.warn(response);
      Alert.alert('Algum erro ocorreu, tente novamente mais tarde');
    }
  };

  const handleSendToken = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const user = {
      email,
    };

    if (!email) {
      setIsLoading(false);
      Alert.alert('Preencha o campo de e-mail');
      return;
    }

    const response = await sendToken(user);

    setIsLoading(false);

    if (response.status === 200) {
      goToNextScreen();
    } else if (response.status === 404) {
      Alert.alert('Não existe um usuário associado a esse e-mail');
    } else {
      console.warn(response);
      Alert.alert(
        'Não foi possível enviar o código de verificação, tente novamente.',
      );
    }
  };

  const goToNextScreen = () => {
    let newSwiperIndex = swiperIndex + 1;

    if (newSwiperIndex === swiperPages) {
      newSwiperIndex = 0;
    }

    swiper.current?.scrollToIndex({index: newSwiperIndex});
    setSwiperIndex(newSwiperIndex);
  };

  return (
    <ScreenContainer>
      <ScrollArea>
        <ContentContainer>
          <Title>Esqueci a senha</Title>

          <StepText>
            Parte {swiperIndex + 1}/{swiperPages}
          </StepText>
        </ContentContainer>

        <SwiperFlatList ref={swiper} showPagination={false} disableGesture>
          <SwiperContainer>
            <InputPrimary
              ref={emailInput}
              placeholder="E-mail"
              keyboardType="email-address"
              maxLength={100}
              onChangeText={text => setEmail(text)}
              onSubmitEditing={() => handleSendToken()}
              returnKeyType="next"
            />

            <ButtonWrapper>
              <ButtonPrimary onPress={() => handleSendToken()}>
                <ButtonText>Obter código de verificação</ButtonText>
              </ButtonPrimary>
            </ButtonWrapper>
          </SwiperContainer>

          <SwiperContainer>
            <InputPrimary
              ref={tokenInput}
              placeholder="Código de verificação"
              autoCorrect={false}
              maxLength={100}
              onChangeText={text => setToken(text)}
              onSubmitEditing={() => senhaInput.current?.focus()}
              returnKeyType="next"
            />
            <InputPrimary
              ref={senhaInput}
              placeholder="Nova senha"
              maxLength={100}
              secureTextEntry
              onChangeText={text => setSenha(text)}
              onSubmitEditing={() => confirmarSenhaInput.current?.focus()}
              returnKeyType="next"
            />
            <InputPrimary
              ref={confirmarSenhaInput}
              placeholder="Confirme a nova senha"
              maxLength={100}
              secureTextEntry
              onChangeText={text => setConfirmarSenha(text)}
              onSubmitEditing={() => handleChangeUserPassword()}
              returnKeyType="done"
            />

            <ButtonWrapper>
              <ButtonPrimary onPress={() => handleChangeUserPassword()}>
                <ButtonText>Alterar senha</ButtonText>
              </ButtonPrimary>
            </ButtonWrapper>
          </SwiperContainer>
        </SwiperFlatList>
      </ScrollArea>

      <LoadingModal visible={isLoading} />
    </ScreenContainer>
  );
};

export default LostPassword;
