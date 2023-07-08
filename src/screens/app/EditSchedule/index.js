import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, StatusBar} from 'react-native';
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
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const EditSchedule = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const {data} = route.params;
  const {user, token} = useUser();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Domingo', value: '0'},
    {label: 'Segunda', value: '1'},
    {label: 'Terça', value: '2'},
    {label: 'Quarta', value: '3'},
    {label: 'Quinta', value: '4'},
    {label: 'Sexta', value: '5'},
    {label: 'Sábado', value: '6'},
  ]);

  const [openQuantity, setOpenQuantity] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantityItems, setQuantityItems] = useState([
    {label: '100g', value: '100'},
    {label: '130g', value: '130'},
    {label: '150g', value: '150'},
    {label: '180g', value: '180'},
    {label: '200g', value: '200'},
  ]);

  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  const [timeItems, setTimeItems] = useState([
    {label: '1min', value: '1'},
    {label: '3min', value: '3'},
    {label: '5min', value: '5'},
    {label: '10min', value: '10'},
    {label: '15min', value: '15'},
  ]);

  const [date, setDate] = useState(new Date());

  useFocusEffect(
    React.useCallback(() => {
      setQuantity(data.quantidade.toString());
      setValue(data.recorrencia.map(number => number.toString()));
      setTime(data.tempoBandeja.toString());

      const [hours, minutes, seconds] = data.horario.split(':');

      const dateObject = new Date();
      dateObject.setHours(hours);
      dateObject.setMinutes(minutes);
      dateObject.setSeconds(seconds);

      setDate(dateObject);
      setIsLoading(true);
    }, [data.horario, data.quantidade, data.recorrencia, data.tempoBandeja]),
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
      ativo: true,
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
            <LeadingTitle>Horário</LeadingTitle>
            <DatePicker
              is24hourSource="locale"
              locale="pt-br"
              style={{width: 200, height: 100}}
              date={date}
              mode="time"
              onDateChange={date => {
                console.log(date);
                setDate(date);
              }}
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
