import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenContainer} from './styles';
import {ScrollArea} from '../../../components/Defaults';
import {InputPrimary} from '../../../components/Inputs';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';
import {colors} from '../../../utils/colors';

import {useUser} from '../../../hooks/user';
import {updateUser} from '../../../services/user';

const Profile = () => {
  const {token, user, storeUser, signOut} = useUser();

  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const nomeInput = useRef();
  const emailInput = useRef();
  const senhaInput = useRef();

  const handleEdit = async () => {
    Keyboard.dismiss();

    const newUser = {
      nome,
      email,
      senha: senha || undefined,
    };

    const response = await updateUser(newUser, user.userHash, token);

    if (response.status === 200) {
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

          <ButtonPrimary onPress={() => handleEdit()}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>

          <ButtonSecondary onPress={() => signOut()}>
            <ButtonText>Sair</ButtonText>
          </ButtonSecondary>
        </ScrollArea>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Profile;
