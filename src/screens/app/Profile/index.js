import React, {useRef, useState} from 'react';
import {Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Container} from './styles';
import {ScrollViewStyled, InputText} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';
import {colorsLight} from '../../../utils/colors';

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
    <SafeAreaView style={{flex: 1, backgroundColor: colorsLight.lightGray}}>
      <Container>
        <ScrollViewStyled>
          <InputText
            ref={nomeInput}
            placeholder="Nome"
            maxLength={100}
            value={nome}
            onChangeText={text => setNome(text)}
            onSubmitEditing={() => emailInput.current?.focus()}
            returnKeyType="next"
          />
          <InputText
            ref={emailInput}
            placeholder="E-mail"
            keyboardType="email-address"
            maxLength={100}
            value={email}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => senhaInput.current?.focus()}
            returnKeyType="next"
          />
          <InputText
            ref={senhaInput}
            placeholder="Nova Senha"
            secureTextEntry
            maxLength={100}
            value={senha}
            onChangeText={text => setSenha(text)}
            returnKeyType="done"
          />

          <ButtonPrimary onPress={() => handleEdit()}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>

          <ButtonPrimary onPress={() => signOut(false)}>
            <ButtonText>Sair</ButtonText>
          </ButtonPrimary>
        </ScrollViewStyled>
      </Container>
    </SafeAreaView>
  );
};

export default Profile;
