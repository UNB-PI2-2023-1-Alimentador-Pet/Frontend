import React from 'react';

import {Container} from './styles';
import {ScrollViewStyled, InputText, Title} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

const Register = () => {
  return (
    <Container>
      <ScrollViewStyled>
        <Title>Registrar</Title>

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
          <ButtonText>Criar conta</ButtonText>
        </ButtonPrimary>
      </ScrollViewStyled>
    </Container>
  );
};

export default Register;
