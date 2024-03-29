import React, {useCallback, useEffect, useState} from 'react';
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
import {convertDaysOfWeek} from '../../../utils/consts';
import {useUser} from '../../../hooks/user';
import {sendFood} from '../../../services/feeder';
import {formattedTime} from '../../../utils/consts';

const Feeder = ({navigation, route}) => {
  const {token, schedules, configs, history} = useUser();
  const feeder = route.params?.data;
  const config = configs[feeder.token] || {};
  const [lastHistory] = history;

  const [nextSchedule, setNextSchedule] = useState('');

  const [isBowlFull, setIsBowlFull] = useState(false);

  const sendFeederFood = async () => {
    const newFood = {
      topic: `feeder/${feeder.token}`,
      action: 'feed',
      quantidade: config.quantidade ? parseInt(config.quantidade) : 50,
      tempoBandeja: config.tempoBandeja ? parseInt(config.tempoBandeja) : 1,
    };

    const response = await sendFood(newFood, token);

    if (response.status === 200) {
      setIsBowlFull(true);
    }
  };

  const getNextSchedule = useCallback(() => {
    const todayDate = new Date();
    const todayWeekDay = todayDate.getDay();

    const scheduleDates = [];

    // Get full datetime from schedules
    schedules.forEach(schedule => {
      const horario = schedule.horario.split(':');

      const scheduleDate = new Date();
      scheduleDate.setHours(horario[0]);
      scheduleDate.setMinutes(horario[1]);

      schedule.recorrencia.forEach(weekDay => {
        const diff = weekDay - todayWeekDay;
        scheduleDate.setDate(todayDate.getDate() + diff);

        scheduleDates.push(scheduleDate.getTime());
      });
    });

    // Sort dates
    scheduleDates.sort((a, b) => a - b);

    // Get the first next schedule
    for (const date of scheduleDates) {
      if (date > todayDate.getTime()) {
        const scheduleDate = new Date(date);
        const scheduleWeekDay = scheduleDate.getDay();
        const scheduleWeekName = convertDaysOfWeek([scheduleWeekDay]);

        setNextSchedule(
          `${scheduleWeekName} - ${scheduleDate.toLocaleTimeString()}`,
        );
        return;
      }
    }
    setNextSchedule('');
  }, [schedules]);

  useEffect(() => {
    let timeout = null;

    if (isBowlFull) {
      timeout = setTimeout(() => {
        setIsBowlFull(false);
      }, 10 * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isBowlFull]);

  useEffect(() => {
    getNextSchedule();
  }, [getNextSchedule]);

  useEffect(() => {
    navigation.setOptions({headerTitle: feeder.nomeAlimentador});
  }, [feeder, navigation]);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <FeedContainer>
        <ActionsButton
          onPress={() => navigation.navigate('Settings', {data: feeder})}>
          <SlidersHorizontal
            color={colors.primary}
            weight="regular"
            size={scale(24)}
          />
        </ActionsButton>

        <FeedButton onPress={() => sendFeederFood()} disabled={isBowlFull}>
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

        <ActionsButton
          onPress={() => navigation.navigate('Report', {data: feeder})}>
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
          subtitle={
            nextSchedule
              ? `Próxima refeição ${nextSchedule}`
              : 'Sem próximas refeições'
          }
          icon={
            <Calendar color={colors.light} size={scale(28)} weight="duotone" />
          }
          onIconPress={() => navigation.navigate('Scheduler', {data: feeder})}
        />

        <Item
          title={'Histórico'}
          subtitle={
            lastHistory
              ? `${lastHistory.data} ${formattedTime(lastHistory.horario)}`
              : 'Sem histórico'
          }
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
