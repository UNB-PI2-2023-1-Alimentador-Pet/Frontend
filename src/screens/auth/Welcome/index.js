import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenContainer, LogoWrapper, Logo} from './styles';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';
import {colors} from '../../../utils/colors';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.light}}>
      <StatusBar backgroundColor={colors.light} barStyle="dark-content" />
      <ScreenContainer>
        <LogoWrapper>
          <Logo source={require('../../../assets/imgs/miaufeeder-logo.png')} />

          <ButtonPrimary onPress={() => navigation.navigate('Login')}>
            <ButtonText>Entrar</ButtonText>
          </ButtonPrimary>

          <ButtonSecondary onPress={() => navigation.navigate('Register')}>
            <ButtonText>Criar conta</ButtonText>
          </ButtonSecondary>
        </LogoWrapper>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Welcome;
