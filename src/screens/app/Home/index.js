import React, {useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircle, PlusCircle} from 'phosphor-react-native';

import Item from '../../../components/Item';
import {ScreenContainer, Header, Content, HomeTitle} from './styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';
import {getFeeders} from '../../../services/feeder';

const Home = ({navigation}) => {
  const {token, user, feeders, storeFeeders} = useUser();

  const fetchFeeders = async () => {
    const response = await getFeeders(user.userHash, token);

    if (response.status === 200) {
      storeFeeders(response.data);
    }
  };

  useEffect(() => {
    fetchFeeders();
  }, []);

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

          {feeders?.length === 0 && (
            <Item
              title={'Nenhum dispositivo adicionado'}
              onPress={() => console.log('Vazio')}
            />
          )}

          {feeders?.map(feeder => (
            <Item
              key={feeder.token}
              image={require('../../../assets/imgs/alimentador.png')}
              title={feeder.nomeAlimentador}
              onPress={() => navigation.navigate('Feeder', {data: feeder})}
            />
          ))}
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Home;
