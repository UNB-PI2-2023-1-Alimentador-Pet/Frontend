import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  SlidersHorizontal,
  ChartLineUp,
  Calendar,
  ClockCounterClockwise,
} from 'phosphor-react-native';
import Paho from 'paho-mqtt';

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

const topic = `/testTopic`;

// const client = mqtt.connect('mqtt://<broker-host>:<broker-port>');
const client = new Paho.Client(
  'broker.emqx.io',
  8083,
  topic,
  'id_' + parseInt(Math.random()*100000),
);

const Feeder = ({navigation, route}) => {
  const {user, schedules} = useUser();
  const feeder = route.params?.data;

  const [nextSchedule, setNextSchedule] = useState('');
  const [isBowlFull, setIsBowlFull] = useState(true);

  console.log(client);
  //console.log(feeder.token);
  //console.log(user.userHash);

  const sendMessage = (m) => {
    const message = new Paho.Message(m.toString());
    message.destinationName = topic;
    client.send(message);
  }

  const onMessage = (message) => {
    if (message.destinationName === topic) {
      console.log(message.payloadString);
    }
  };

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected!');
        client.subscribe(topic);
        client.onMessageArrived = onMessage;
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  }, []);

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
    getNextSchedule();
  }, [getNextSchedule]);

  useEffect(() => {
    navigation.setOptions({headerTitle: feeder.nomeAlimentador});
  }, [feeder, navigation]);

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />

      <FeedContainer>
        <ActionsButton
          onPress={() => navigation.navigate('Settings', {data: feeder})}>
          <SlidersHorizontal
            color={colors.primary}
            weight="regular"
            size={scale(24)}
          />
        </ActionsButton>

        <FeedButton onPress={() => sendMessage("teste")}>
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
            nextSchedule ? `Próxima refeição ${nextSchedule}` : 'Sem refeições'
          }
          icon={
            <Calendar color={colors.light} size={scale(28)} weight="duotone" />
          }
          onIconPress={() => navigation.navigate('Scheduler')}
        />

        <Item
          title={'Histórico'}
          // Todo: Buscar do MQTT
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
