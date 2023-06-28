import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {ScreenContainer, Header} from './styles';
import {colors} from '../../../utils/colors';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';
import {Calendar} from 'phosphor-react-native';
import {scale} from '../../../utils/scalling';

const Feeder = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Header style={{backgroundColor: colors.mediumGray}} />
        <Content>
          <Item
            title={'Agenda'}
            // Todo: Buscar da API
            subtitle={'Próxima refeição 20:45'}
            icon={
              <Calendar
                color={colors.light}
                size={scale(24)}
                weight="duotone"
              />
            }
            onIconPress={() => navigation.navigate('Scheduler')}
          />
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Feeder;
