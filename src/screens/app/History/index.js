import React from 'react';
import {Gauge, PawPrint} from 'phosphor-react-native';

import {ScreenContainer} from './styles';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

const History = ({navigation}) => {
  return (
    <ScreenContainer>
      <Content>
        <Item
          title={'Nível baixo de ração'}
          // Todo: Buscar da API
          subtitle={'17/05/2023 08:45 '}
          icon={
            <Gauge color={colors.light} size={scale(24)} weight="duotone" />
          }
        />
        <Item
          title={'Ração liberada'}
          // Todo: Buscar da API
          subtitle={'17/05/2023 08:45'}
          icon={
            <PawPrint color={colors.light} size={scale(24)} weight="duotone" />
          }
        />
      </Content>
    </ScreenContainer>
  );
};

export default History;
