import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Container, Logo, ContainerLogo} from './styles';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

import {colorsLight} from '../../../utils/colors';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorsLight.light}}>
      <Container>
        <Logo source={require('../../../assets/imgs/miaufeeder-logo.png')} />

        <ButtonPrimary onPress={() => navigation.navigate('Login')}>
          <ButtonText>Entrar</ButtonText>
        </ButtonPrimary>

        <ButtonPrimary onPress={() => navigation.navigate('Register')}>
          <ButtonText>Criar conta</ButtonText>
        </ButtonPrimary>
      </Container>
    </SafeAreaView>
  );
};

export default Welcome;
