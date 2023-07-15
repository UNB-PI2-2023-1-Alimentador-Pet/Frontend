import React, {useCallback, useState, useEffect} from 'react';
import {LineChart} from 'react-native-gifted-charts';

import {
  ScreenContainer,
  ChartContainer,
  ChartWrapper,
  ChartTitleText,
  ChartValueText,
} from './styles';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';
import {getHistories} from '../../../services/history';

const Report = () => {
  const {user, token, history, storeHistory} = useUser();

  const [chartData, setChartData] = useState([]);
  const [consumoMedio, setConsumoMedio] = useState(0);
  const [horarioMedio, setHorarioMedio] = useState('');

  const getMediumTime = useCallback(() => {
    const datas = [];

    history.forEach(item => {
      datas.push(new Date(`${item.data}T${item.horario}`));
    });

    const somaHorarios = datas.reduce(
      (total, data) => total + data.getTime(),
      0,
    );

    const mediaHorario = somaHorarios / datas.length;
    const mediaHorarioDate = new Date(mediaHorario);

    const hora = mediaHorarioDate.getHours().toString().padStart(2, '0');
    const minutos = mediaHorarioDate.getMinutes().toString().padStart(2, '0');

    setHorarioMedio(`${hora}:${minutos}`);
  }, [history]);

  const formattedData = useCallback(async () => {
    const data = [];
    let quantidadeConsumidaTotal = 0;
    let vezes = 0;

    history.forEach(item => {
      const splittedDate = item.data.split('-');

      data.push({
        value: item.quantidadeConsumida,
        label: `${splittedDate[2]}/${splittedDate[1]}`,
      });

      quantidadeConsumidaTotal += item.quantidadeConsumida;
      vezes += 1;
    });

    const mediaConsumo = quantidadeConsumidaTotal / vezes;
    setConsumoMedio(mediaConsumo);
    setChartData(data);
  }, [history]);

  const fetchHistory = async () => {
    const response = await getHistories(user.userHash, token);

    console.log(response);

    if (response.status === 200) {
      if (!response.data?.message) {
        const slicedHistory = response.data.reverse().slice(0, 7);
        storeHistory(slicedHistory);
      } else {
        storeHistory([]);
      }
    }
  };

  useEffect(() => {
    formattedData();
    getMediumTime();
  }, [history, formattedData, getMediumTime]);

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScreenContainer>
      <Content>
        <ChartWrapper>
          <LineChart
            data={chartData}
            thickness={scale(2)}
            initialSpacing={scale(20)}
            // noOfSections={3}
            spacing={scale(36)}
            yAxisTextStyle={{
              fontFamily: 'Inter-Medium',
              color: colors.darkGray,
            }}
            yAxisLabelSuffix="g"
            yAxisColor={colors.darkGray}
            xAxisLabelTextStyle={{
              fontFamily: 'Inter-Medium',
              color: colors.darkGray,
            }}
            dataPointsColor={colors.primary}
            xAxisColor={colors.darkGray}
            rulesColor={colors.lightGray}
            color={colors.primary}
            isAnimated
          />
        </ChartWrapper>

        <ChartContainer>
          <ChartWrapper style={{width: '48%'}}>
            <ChartTitleText>CONSUMO MÉDIO</ChartTitleText>
            <ChartValueText>{consumoMedio.toFixed(0)}g</ChartValueText>
          </ChartWrapper>

          <ChartWrapper style={{width: '48%'}}>
            <ChartTitleText>HORÁRIO MÉDIO</ChartTitleText>
            <ChartValueText>{horarioMedio}</ChartValueText>
          </ChartWrapper>
        </ChartContainer>
      </Content>
    </ScreenContainer>
  );
};

export default Report;
