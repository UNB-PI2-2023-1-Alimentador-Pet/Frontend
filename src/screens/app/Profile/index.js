import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircle} from 'phosphor-react-native';

import LoadingModal from '../../../components/LoadingModal';
import {ScreenContainer, AvatarWrapper} from './styles';
import {ScrollArea, ContentContainer} from '../../../components/Defaults';
import {InputPrimary} from '../../../components/Inputs';
import {
  ButtonWrapper,
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';
import {updateUser} from '../../../services/user';

const Profile = () => {
  const {token, user, storeUser, signOut} = useUser();

  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nomeInput = useRef();
  const emailInput = useRef();
  const senhaInput = useRef();

  const handleEdit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const newUser = {
      nome,
      email,
      senha: senha || undefined,
    };

    const response = await updateUser(newUser, user.userHash, token);

    setIsLoading(false);

    if (response.status === 200) {
      Alert.alert('Seu perfil foi atualizado');
      storeUser(response.data);
    } else if (response.status === 401) {
      Alert.alert('Seu token expirou, faça login novamente');
    } else {
      Alert.alert('Erro ao editar perfil');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <ScreenContainer>
        <ScrollArea>
          <ContentContainer>
            <AvatarWrapper>
              <UserCircle
                color={colors.primary}
                weight="duotone"
                size={scale(134)}
              />
            </AvatarWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputPrimary
              ref={nomeInput}
              placeholder="Nome"
              maxLength={100}
              value={nome}
              onChangeText={text => setNome(text)}
              onSubmitEditing={() => emailInput.current?.focus()}
              returnKeyType="next"
              light
            />
            <InputPrimary
              ref={emailInput}
              placeholder="E-mail"
              keyboardType="email-address"
              maxLength={100}
              value={email}
              onChangeText={text => setEmail(text)}
              onSubmitEditing={() => senhaInput.current?.focus()}
              returnKeyType="next"
              light
            />
            <InputPrimary
              ref={senhaInput}
              placeholder="Nova Senha"
              secureTextEntry
              maxLength={100}
              value={senha}
              onChangeText={text => setSenha(text)}
              returnKeyType="done"
              light
            />
          </ContentContainer>

          <ContentContainer>
            <ButtonWrapper>
              <ButtonPrimary onPress={() => handleEdit()}>
                <ButtonText>Salvar</ButtonText>
              </ButtonPrimary>

              <ButtonSecondary onPress={() => signOut()}>
                <ButtonText>Sair</ButtonText>
              </ButtonSecondary>
            </ButtonWrapper>
          </ContentContainer>
        </ScrollArea>

        <LoadingModal visible={isLoading} />
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Profile;
