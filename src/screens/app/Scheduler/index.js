import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, TouchableOpacity} from 'react-native';
import {ScreenContainer, Header} from './styles';
import {colors} from '../../../utils/colors';
import Item from '../../../components/Item';
import {Content} from '../Home/styles';
import {PlusCircle, Calendar} from 'phosphor-react-native';
import {scale} from '../../../utils/scalling';

const Scheduler = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Content>
          <Item
            title={'8:45'}
            // Todo: Buscar da API
            subtitle={'180g - Seg, Qua, Sex'}
            icon={
              <Calendar
                color={colors.light}
                size={scale(24)}
                weight="duotone"
              />
            }
            onIconPress={() =>
              navigation.navigate('AddSchedule', {isEditing: true})
            }
          />
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Scheduler;
