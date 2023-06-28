import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import {ScreenContainer, Row, LeadingTitle, SaveButton} from './styles';
import {colors} from '../../../utils/colors';
import {Content} from '../Home/styles';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonText,
} from '../../../components/Buttons';
import SelectPicker from '../../../components/SelectPicker';
import DatePicker from 'react-native-date-picker';

const AddSchedule = ({navigation, route}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Segunda', value: 'seg'},
    {label: 'Terça', value: 'ter'},
    {label: 'Quarta', value: 'qua'},
    {label: 'Quinta', value: 'qui'},
    {label: 'Sexta', value: 'sex'},
    {label: 'Sábado', value: 'sab'},
    {label: 'Domingo', value: 'dom'},
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
    {label: '1min', value: '60'},
    {label: '3min', value: '180'},
    {label: '5min', value: '300'},
    {label: '10min', value: '600'},
    {label: '15min', value: '900'},
  ]);

  const [date, setDate] = useState(new Date());
  const isEditing = route.params?.isEditing;

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({headerTitle: 'Editar horário'});
    } else {
      navigation.setOptions({headerTitle: 'Adicionar novo horário'});
    }
  }, [isEditing, navigation]);

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
          <ButtonPrimary style={{marginTop: 40}}>
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
