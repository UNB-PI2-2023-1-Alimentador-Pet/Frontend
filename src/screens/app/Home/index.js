import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircle, PlusCircle} from 'phosphor-react-native';

import {Container, Header, Content, HomeTitle} from './styles';
import {Item} from '../../../components/Defaults';
import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Header>
          <UserCircle
            color={colorsLight.primarycolor}
            weight="fill"
            size={scale(28)}
          />
          <PlusCircle
            color={colorsLight.primarycolor}
            weight="fill"
            size={scale(28)}
          />
        </Header>

        <Content>
          <HomeTitle>Todos os dispositivos</HomeTitle>

          <Item>
            <HomeTitle>Dispositivo 1</HomeTitle>
          </Item>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
