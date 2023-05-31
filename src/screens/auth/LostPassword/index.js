import React, {useRef, useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {Container, ScreenView} from './styles';
import {
  ScrollViewStyled,
  InputText,
  Title,
  SubTitle,
} from '../../../components/Defaults';
import {ButtonPrimary, ButtonText} from '../../../components/ButtonPrimary';

const LostPassword = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);

  const swiper = useRef();

  const goToNextScreen = () => {
    let newSwiperIndex = swiperIndex + 1;

    if (newSwiperIndex > 2) {
      newSwiperIndex = 0;
    }

    swiper.current?.scrollToIndex({index: newSwiperIndex});
    setSwiperIndex(newSwiperIndex);
  };

  return (
    <Container>
      <ScrollViewStyled>
        <Title>Esqueci a senha</Title>

        <SubTitle>Parte {swiperIndex + 1}/3</SubTitle>

        <SwiperFlatList showPagination={false} ref={swiper}>
          <ScreenView>
            <InputText
              placeholder="E-mail"
              keyboardType="email-address"
              maxLength={100}
              returnKeyType="next"
            />

            <ButtonPrimary onPress={() => goToNextScreen()}>
              <ButtonText>Obter código de verificação</ButtonText>
            </ButtonPrimary>
          </ScreenView>

          <ScreenView>
            <InputText
              placeholder="Código de verificação"
              autoCorrect={false}
              maxLength={100}
              secureTextEntry
              returnKeyType="next"
            />

            <ButtonPrimary onPress={() => goToNextScreen()}>
              <ButtonText>Confirmar</ButtonText>
            </ButtonPrimary>
          </ScreenView>

          <ScreenView>
            <InputText
              placeholder="Nova senha"
              maxLength={100}
              secureTextEntry
              returnKeyType="next"
            />
            <InputText
              placeholder="Confirme a nova senha"
              maxLength={100}
              secureTextEntry
              returnKeyType="done"
            />

            <ButtonPrimary onPress={() => goToNextScreen()}>
              <ButtonText>Alterar senha</ButtonText>
            </ButtonPrimary>
          </ScreenView>
        </SwiperFlatList>
      </ScrollViewStyled>
    </Container>
  );
};

export default LostPassword;
