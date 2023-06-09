import React, {useRef, useState} from 'react';
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

const LostPassword = () => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    <ScreenContainer>
      <ScrollArea>
        <ContentContainer>
          <Title>Esqueci a senha</Title>

          <StepText>Parte {swiperIndex + 1}/3</StepText>
        </ContentContainer>

        <SwiperFlatList ref={swiper} showPagination={false} disableGesture>
          <SwiperContainer>
            <InputPrimary
              placeholder="E-mail"
              keyboardType="email-address"
              maxLength={100}
              returnKeyType="next"
            />

            <ButtonWrapper>
              <ButtonPrimary onPress={() => goToNextScreen()}>
                <ButtonText>Obter código de verificação</ButtonText>
              </ButtonPrimary>
            </ButtonWrapper>
          </SwiperContainer>

          <SwiperContainer>
            <InputPrimary
              placeholder="Código de verificação"
              autoCorrect={false}
              maxLength={100}
              secureTextEntry
              returnKeyType="next"
            />

            <ButtonWrapper>
              <ButtonPrimary onPress={() => goToNextScreen()}>
                <ButtonText>Confirmar</ButtonText>
              </ButtonPrimary>
            </ButtonWrapper>
          </SwiperContainer>

          <SwiperContainer>
            <InputPrimary
              placeholder="Nova senha"
              maxLength={100}
              secureTextEntry
              returnKeyType="next"
            />
            <InputPrimary
              placeholder="Confirme a nova senha"
              maxLength={100}
              secureTextEntry
              returnKeyType="done"
            />

            <ButtonWrapper>
              <ButtonPrimary onPress={() => goToNextScreen()}>
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
