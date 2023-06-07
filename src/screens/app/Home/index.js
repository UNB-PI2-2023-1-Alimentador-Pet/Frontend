import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircle, PlusCircle} from 'phosphor-react-native';

import {Container, Header, Content, HomeTitle} from './styles';
import {Item} from '../../../components/Defaults';
import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';

const Home = ({navigation}) => {
  const {devices} = useUser();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorsLight.lightGray}}>
      <Container>
        <Header>
          <TouchableOpacity
            onPress={() => navigation.navigate('SendData', {ssid: 'Wifi'})}>
            <UserCircle
              color={colorsLight.primarycolor}
              weight="fill"
              size={scale(28)}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddDevice')}>
            <PlusCircle
              color={colorsLight.primarycolor}
              weight="fill"
              size={scale(28)}
            />
          </TouchableOpacity>
        </Header>

        <Content>
          <HomeTitle>Todos os dispositivos</HomeTitle>

          {devices.length === 0 && (
            <Item>
              <HomeTitle>Nenhum dispositivo adicionado</HomeTitle>
            </Item>
          )}
          {devices.map(device => (
            <Item key={device.id}>
              <HomeTitle>{device.nome}</HomeTitle>
            </Item>
          ))}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
