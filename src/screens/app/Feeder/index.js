import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'react-native';
import { ScreenContainer, Header } from './styles';
import { colors } from "../../../utils/colors";
import Item from '../../../components/Item';
import { Content } from "../Home/styles";

const Feeder = ({navigation}) => {
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray }}>
            <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
            <ScreenContainer>
                <Header style={{backgroundColor: colors.mediumGray}}>

                </Header>
                <Content>
                    <Item 
                        title={'Agenda'} 
                        // Todo: Buscar da API
                        subtitle={'Próxima refeição 20:45'}
                        image={require('../../../assets/imgs/calendar.png')}
                        onPress={() => navigation.navigate('Feeder')}
                    />
                </Content>
            </ScreenContainer>
        </SafeAreaView>
    );
};

export default Feeder;