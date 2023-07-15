import React, {useState} from 'react';
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
import {createSchedule} from '../../../services/schedule';
import {useUser} from '../../../hooks/user';
import {
  weekChoices,
  quantityChoices,
  timeChoices,
} from '../../../utils/selector';

const AddSchedule = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {user, token} = useUser();
  const feeder = route.params?.data;
  const isEditing = route.params?.isEditing;

  console.log(route.params?.data);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(weekChoices);

  const [openQuantity, setOpenQuantity] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantityItems, setQuantityItems] = useState(quantityChoices);

  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(null);
  const [timeItems, setTimeItems] = useState(timeChoices);

  const [date, setDate] = useState(new Date());

  const handleCreateSchedule = async () => {
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
      token: feeder.token,
    };

    const response = await createSchedule(schedule, token);

    console.log(response);

    setIsLoading(false);

    if (response.status === 200) {
      navigation.navigate('Scheduler', {data: feeder});
    } else if (response.status === 500) {
      Alert.alert(
        'Não foi possivel agendar, já existe um agendamento para o mesmo horário!',
      );
    } else {
      Alert.alert('Não foi possivel agendar, tente novamente mais tarde!');
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
            onPress={() => handleCreateSchedule()}
            style={{marginTop: 40}}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>

          {isEditing ? (
            <ButtonSecondary>
              <ButtonText>Excluir</ButtonText>
            </ButtonSecondary>
          ) : null}
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default AddSchedule;
