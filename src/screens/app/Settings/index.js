import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Keyboard, StatusBar, TouchableOpacity, Text} from 'react-native';

import {
  ScreenContainer,
  Row,
  LeadingTitle,
  AudioSelect,
  AudioTextSelect,
} from './styles';
import {colors} from '../../../utils/colors';
import {Content} from '../Home/styles';
import {InputPrimary} from '../../../components/Inputs';
import {useUser} from '../../../hooks/user';
import SelectPicker from '../../../components/SelectPicker';
import {ButtonPrimary, ButtonText} from '../../../components/Buttons';
import DocumentPicker from 'react-native-document-picker';
import {File} from 'phosphor-react-native';
import {quantityChoices, timeChoices} from '../../../utils/selector';
import {updateFeeder} from '../../../services/feeder';

const Settings = ({navigation, route}) => {
  const {token, feeders, storeFeeders, configs, storeConfigs} = useUser();
  const feeder = route.params?.data;
  const config = configs[feeder.token] || {};

  console.log(configs);

  const [nome, setNome] = useState(feeder.nomeAlimentador);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [quantity, setQuantity] = useState(config.quantidadePadrao);
  const [quantityItems, setQuantityItems] = useState(quantityChoices);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(config.tempoBandeja);
  const [timeItems, setTimeItems] = useState(timeChoices);
  const [fileResponse, setFileResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nomeInput = useRef();

  const handleEdit = async () => {
    setIsLoading(true);

    const newFeeder = {
      nomeAlimentador: nome,
    };

    const newConfig = {
      quantidadePadrao: quantity,
      tempoBandeja: time,
    };

    const response = await updateFeeder(newFeeder, feeder.token, token);

    setIsLoading(false);

    if (response.status === 200) {
      const feederNew = response.data;
      const newFeeders = feeders.filter(f => f.token !== feeder.token);
      newFeeders.push(feederNew);
      storeFeeders(newFeeders);

      Object.assign(config, newConfig);
      configs[feeder.token] = config;
      storeConfigs(configs);

      navigation.navigate('Feeder', {data: feederNew});
    } else if (response.status === 401) {
      Alert.alert('Seu token expirou, faça login novamente');
    } else {
      Alert.alert('Erro ao editar perfil');
    }
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: DocumentPicker.types.audio,
      });
      setFileResponse([pickerResult]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
      <StatusBar backgroundColor={colors.lightGray} barStyle="dark-content" />
      <ScreenContainer>
        <Content>
          <Row>
            <LeadingTitle>Nome do Alimentador</LeadingTitle>
            <InputPrimary
              ref={nomeInput}
              placeholder="Nome"
              maxLength={100}
              value={nome}
              onChangeText={text => setNome(text)}
              onSubmitEditing={() => Keyboard.dismiss()}
              returnKeyType="next"
              style={{width: 200}}
              light
            />
          </Row>
          <Row style={{zIndex: 10}}>
            <LeadingTitle>Quantidade padrão</LeadingTitle>
            <SelectPicker
              placeholder="Selecione a quantidade padrão"
              open={openQuantity}
              value={quantity}
              items={quantityItems}
              setItems={setQuantityItems}
              setValue={setQuantity}
              setOpen={setOpenQuantity}
            />
          </Row>
          <Row style={{zIndex: 8}}>
            <LeadingTitle>Tempo da bandeja</LeadingTitle>
            <SelectPicker
              placeholder="Selecione o tempo de bandeja"
              open={openTime}
              value={time}
              items={timeItems}
              setItems={setTimeItems}
              setValue={setTime}
              setOpen={setOpenTime}
            />
          </Row>
          {/*
          <Row>
            <LeadingTitle>Gravação a ser tocada</LeadingTitle>
            <AudioSelect>
              <AudioTextSelect>Nenhuma selecionada.</AudioTextSelect>
              <TouchableOpacity onPress={handleDocumentSelection}>
                <File></File>
              </TouchableOpacity>
            </AudioSelect>
          </Row>
          */}

          <Text style={{textAlign: 'center'}}>
            Essas são as configurações padrão ao tocar no botão “Alimentar” do
            Alimentador
          </Text>

          <ButtonPrimary style={{marginTop: 25}} onPress={() => handleEdit()}>
            <ButtonText>Salvar</ButtonText>
          </ButtonPrimary>
        </Content>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default Settings;
