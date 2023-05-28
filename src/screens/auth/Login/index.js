import React from 'react';

import {Container} from './styles';
import {ScrollViewStyled, InputText, Title} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

const Login = () => {
  return (
    <Container>
      <ScrollViewStyled>
        <Title>Entrar</Title>

        <InputText
          placeholder="E-mail"
          keyboardType="email-address"
          maxLength={100}
          returnKeyType="next"
        />
        <InputText
          placeholder="Senha"
          maxLength={100}
          secureTextEntry
          returnKeyType="done"
        />

        <ButtonPrimary>
          <ButtonText>Entrar</ButtonText>
        </ButtonPrimary>

        <ButtonPrimary>
          <ButtonText>Esqueci a senha</ButtonText>
        </ButtonPrimary>
      </ScrollViewStyled>
    </Container>
  );
};

export default Login;
