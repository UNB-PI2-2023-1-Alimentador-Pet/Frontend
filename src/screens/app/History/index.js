import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Gauge, PawPrint} from 'phosphor-react-native';

import {ScreenContainer} from './styles';
import Item from '../../../components/Item';
import {ScrollArea} from '../../../components/Defaults';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';
import {getHistories} from '../../../services/history';
import {formattedTime} from '../../../utils/consts';

const History = ({navigation}) => {
  const {token, user, history, storeHistory} = useUser();

  const fetchHistory = async () => {
    const response = await getHistories(user.userHash, token);

    console.log(response);

    if (response.status === 200) {
      if (!response.data?.message) {
        const slicedHistory = response.data.reverse().slice(0, 7);
        storeHistory(slicedHistory);
      } else {
        storeHistory([]);
      }
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScreenContainer>
      <ScrollArea>
        <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
        <Content>
          {history.length > 0 ? (
            history.map(item => (
              <Item
                key={item.id}
                title={'Ração liberada'}
                subtitle={`${item.data} ${formattedTime(item.horario)}`}
                icon={
                  <PawPrint
                    color={colors.light}
                    size={scale(28)}
                    weight="duotone"
                  />
                }
              />
            ))
          ) : (
            <Item
              title={'Nenhum histórico ainda'}
              icon={
                <PawPrint
                  color={colors.light}
                  size={scale(28)}
                  weight="duotone"
                />
              }
            />
          )}
        </Content>
      </ScrollArea>
    </ScreenContainer>
  );
};

export default History;
