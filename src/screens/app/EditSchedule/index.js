import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, StatusBar, Switch} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {ScreenContainer, Row, LeadingTitle} from './styles';
import {colors} from '../../../utils/colors';
import {Content} from '../Home/styles';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';
import SelectPicker from '../../../components/SelectPicker';
import DatePicker from 'react-native-date-picker';
import {updateSchedule, deleteSchedule} from '../../../services/schedule';
import {useUser} from '../../../hooks/user';
import {
  weekChoices,
  quantityChoices,
  timeChoices,
} from '../../../utils/selector';

const EditSchedule = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);

  const data = route.params?.data;
  const {user, token} = useUser();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(weekChoices);

  const [openQuantity, setOpenQuantity] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantityItems, setQuantityItems] = useState(quantityChoices);

  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  const [timeItems, setTimeItems] = useState(timeChoices);

  const [isEnable, setIsEnable] = useState(false);
  const [date, setDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      setIsEnable(data.ativo);
      setQuantity(data.quantidade.toString());
      setValue(data.recorrencia.map(number => number.toString()));
      setTime(data.tempoBandeja.toString());

      const [hours, minutes, seconds] = data.horario.split(':');

      const dateObject = new Date();
      dateObject.setHours(hours);
      dateObject.setMinutes(minutes);
      dateObject.setSeconds(seconds);
      setDate(dateObject);
    }, [
      data.ativo,
      data.horario,
      data.quantidade,
      data.recorrencia,
      data.tempoBandeja,
    ]),
  );

  const handleEditSchedule = async () => {
    setIsLoading(true);

    const formattedDate = date.toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const schedule = {
      ativo: isEnable,
      quantidade: quantity,
      recorrencia: value,
      horario: formattedDate,
      tempoBandeja: time,
      userHash: user.userHash,
    };

    const response = await updateSchedule(
      data.horario,
      data.quantidade,
      user.userHash,
      token,
      schedule,
    );

    console.log(response);

    setIsLoading(false);

    if (response.status === 200) {
      Alert.alert(
        'Agendamento atualizado!',
        'O agendamento foi atualizado com sucesso.',
        [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
            style: 'success',
          },
        ],
      );
    } else if (response.status === 500) {
      Alert.alert(
        'Não foi possivel atualizar, já existe um agendamento para o mesmo horário!',
      );
    } else {
      Alert.alert('Não foi possivel atualizar, tente novamente mais tarde!');
    }
  };

  const handleDeleteSchedule = async () => {
    const response = await deleteSchedule(
      data.horario,
      data.quantidade,
      user.userHash,
      token,
    );

    console.log(response);

    if (response.status === 200) {
      Alert.alert(
        'Agendamento excluido!',
        'O agendamento foi excluido com sucesso.',
        [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
            style: 'success',
          },
        ],
      );
    } else if (response.status === 500) {
      Alert.alert('Não foi possivel excluir, erro interno do servidor!');
    } else {
      Alert.alert('Não foi possivel excluir, tente novamente mais tarde!');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Content>
          <Row>
            <LeadingTitle>Ativo</LeadingTitle>
            <Switch
              trackColor={{false: '#767577', true: colors.primary}}
              thumbColor={isEnable ? colors.white : colors.white}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnable(!isEnable)}
              value={isEnable}
            />
          </Row>
          <Row>
            <LeadingTitle>Horário</LeadingTitle>
            <DatePicker
              is24hourSource="locale"
              locale="pt-br"
              style={{width: 200, height: 100}}
              date={date}
              mode="time"
              theme="light"
              onDateChange={setDate}
            />
          </Row>
          <Row style={{marginTop: 30, zIndex: 10}}>
            <LeadingTitle>Repetir</LeadingTitle>
            <SelectPicker
              placeholder="Selecione a frequência"
              open={open}
              value={value}
              items={items}
              setItems={setItems}
              setValue={setValue}
              setOpen={setOpen}
              multiple={true}
              min={0}
              max={7}
              showBadgeDot={false}
              mode="BADGE"
            />
          </Row>
          <Row style={{marginTop: 30, zIndex: 8}}>
            <LeadingTitle>Quantidade</LeadingTitle>
            <SelectPicker
              placeholder="Selecione a quantidade"
              open={openQuantity}
              value={quantity}
              items={quantityItems}
              setItems={setQuantityItems}
              setValue={setQuantity}
              setOpen={setOpenQuantity}
            />
          </Row>
          <Row style={{marginTop: 30, zIndex: 6}}>
            <LeadingTitle>Tempo da bandeja</LeadingTitle>
            <SelectPicker
              placeholder="Selecione o tempo da bandeja"
              open={openTime}
              value={time}
              items={timeItems}
              setItems={setTimeItems}
              setValue={setTime}
              setOpen={setOpenTime}
            />
          </Row>

          <ButtonPrimary
            onPress={() => handleEditSchedule()}
            style={{marginTop: 40}}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>

          <ButtonSecondary onPress={() => handleDeleteSchedule()}>
            <ButtonText>Excluir</ButtonText>
          </ButtonSecondary>
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default EditSchedule;
