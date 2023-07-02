import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  SlidersHorizontal,
  ChartLineUp,
  Calendar,
  ClockCounterClockwise,
} from 'phosphor-react-native';

import {
  ScreenContainer,
  FeedContainer,
  FeedButton,
  Feed,
  BowlImage,
  FeedText,
  ActionsButton,
} from './styles';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

const Feeder = ({navigation}) => {
  const [isBowlFull, setIsBowlFull] = useState(true);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />

      <FeedContainer>
        <ActionsButton>
          <SlidersHorizontal
            color={colors.primary}
            weight="regular"
            size={scale(24)}
          />
        </ActionsButton>

        <FeedButton onPress={() => setIsBowlFull(!isBowlFull)}>
          <Feed>
            {isBowlFull ? (
              <BowlImage
                source={require('../../../assets/imgs/bowl-full.png')}
              />
            ) : (
              <BowlImage
                source={require('../../../assets/imgs/bowl-empty.png')}
              />
            )}
            <FeedText>Alimentar</FeedText>
          </Feed>
        </FeedButton>

        <ActionsButton>
          <ChartLineUp
            color={colors.primary}
            weight="regular"
            size={scale(24)}
          />
        </ActionsButton>
      </FeedContainer>

      <Content>
        <Item
          title={'Agenda'}
          // Todo: Buscar da API
          subtitle={'Próxima refeição 20:45'}
          icon={
            <Calendar color={colors.light} size={scale(28)} weight="duotone" />
          }
          onIconPress={() => navigation.navigate('Scheduler')}
        />
        <Item
          title={'Histórico'}
          // Todo: Buscar da API
          subtitle={'17/05/2023 08:45 - Ração'}
          icon={
            <ClockCounterClockwise
              color={colors.light}
              size={scale(28)}
              weight="duotone"
            />
          }
          onIconPress={() => navigation.navigate('History')}
        />
      </Content>
    </ScreenContainer>
  );
};

export default Feeder;
