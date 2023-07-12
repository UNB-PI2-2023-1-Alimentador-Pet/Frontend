import React, {useCallback, useState} from 'react';
import {StatusBar} from 'react-native';
import {Calendar} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';

import LoadingModal from '../../../components/LoadingModal';
import {ScreenContainer} from './styles';
import {colors} from '../../../utils/colors';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';

import {scale} from '../../../utils/scalling';
import {convertDaysOfWeek} from '../../../utils/consts';
import {getSchedules} from '../../../services/schedule';
import {useUser} from '../../../hooks/user';

const Scheduler = ({navigation}) => {
  const {user, token, schedules, storeSchedules} = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    const response = await getSchedules(user.userHash, token);

    setIsLoading(false);

    if (response.status === 200) {
      if (response.data.length) {
        storeSchedules(response.data);
      }
    }
  }, [user.userHash, token]);

  useFocusEffect(
    useCallback(() => {
      fetchSchedules();
    }, [fetchSchedules]),
  );

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <Content>
        {schedules.length > 0 ? (
          schedules.map(item => (
            <Item
              key={item.horario}
              title={item.horario}
              subtitle={`${item.quantidade}g - ${convertDaysOfWeek(
                item.recorrencia,
              )}`}
              icon={
                <Calendar
                  color={colors.light}
                  size={scale(24)}
                  weight="duotone"
                />
              }
              onIconPress={() =>
                navigation.navigate('EditSchedule', {data: item})
              }
            />
          ))
        ) : (
          <Item
            title="Nenhum horário cadastrado"
            icon={
              <Calendar
                color={colors.light}
                size={scale(24)}
                weight="duotone"
              />
            }
          />
        )}
      </Content>

      <LoadingModal visible={isLoading} />
    </ScreenContainer>
  );
};

export default Scheduler;
