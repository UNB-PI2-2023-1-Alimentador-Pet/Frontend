import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, TouchableOpacity} from 'react-native';
import {ScreenContainer, Header} from './styles';
import {colors} from '../../../utils/colors';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';
import {PlusCircle, Calendar} from 'phosphor-react-native';
import {scale} from '../../../utils/scalling';
import {getSchedules} from '../../../services/schedule';
import {useUser} from '../../../hooks/user';
import {Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const Scheduler = ({navigation}) => {
  const {user, token} = useUser();
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const convertDaysOfWeek = days => {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const convertedDays = days.map(day => daysOfWeek[day]);
    return convertedDays.join(', ');
  };

  useEffect(() => {
    fetchSchedules();
  }, [user.userHash, token, fetchSchedules]);

  const fetchSchedules = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getSchedules(user.userHash, token);

      if (response.status === 200) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token, user.userHash]);

  useFocusEffect(() => {
    fetchSchedules();
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Content>
          {schedules.length > 0 ? (
            schedules.map((item, index) => (
              <Item
                key={index}
                title={item.horario}
                // Todo: Buscar da API
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
          ) : isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            <Text>Nenhum agendamento encontrado.</Text>
          )}
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Scheduler;
