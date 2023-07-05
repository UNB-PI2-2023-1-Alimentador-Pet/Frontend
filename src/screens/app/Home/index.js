import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircle, PlusCircle} from 'phosphor-react-native';

import Item from '../../../components/Item';
import {ScreenContainer, Header, Content, HomeTitle} from './styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';

const Home = ({navigation}) => {
  const {devices} = useUser();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Header>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <UserCircle color={colors.primary} weight="fill" size={scale(30)} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddDevice')}>
            <PlusCircle color={colors.primary} weight="fill" size={scale(30)} />
          </TouchableOpacity>
        </Header>

        <Content>
          <HomeTitle>Todos os dispositivos</HomeTitle>

          {devices.length === 0 && (
            <Item
              title={'Nenhum dispositivo adicionado'}
              onPress={() => navigation.navigate('Feeder')}
            />
          )}

          {devices.map(device => (
            <Item
              key={device.id}
              image={require('../../../assets/imgs/alimentador.png')}
              title={device.nome}
              onPress={() => navigation.navigate('Feeder')}
            />
          ))}
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Home;
