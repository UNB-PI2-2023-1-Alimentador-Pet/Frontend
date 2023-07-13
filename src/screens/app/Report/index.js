import React, {useState, useEffect} from 'react';
import {Gauge, PawPrint} from 'phosphor-react-native';
import {LineChart} from 'react-native-gifted-charts';
import {Image} from 'react-native';
import {Buffer} from 'buffer';

import {ScreenContainer, ChartContainer, ChartWrapper} from './styles';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

import {useUser} from '../../../hooks/user';
import {getHistories} from '../../../services/history';

const Report = ({navigation}) => {
  const {user, token} = useUser();

  const [value, setValue] = useState("");

  const data = [
    {value: 40, label: 'Dom'},
    {value: 50, label: 'Seg'},
    {value: 80, label: 'Ter'},
    {value: 90, label: 'Qua'},
    {value: 70, label: 'Qui'},
    {value: 20, label: 'Sex'},
    {value: 30, label: 'Sab'},
  ];

  const fetchHistory = async () => {
    const response = await getHistories(user.userHash, token);
    
    const histories = response.data;

    //const buffer = Buffer.from(histories[1].foto);
    //const base64 = buffer.toString('base64');
    //setValue(base64);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScreenContainer>
      <Content>
        <ChartWrapper>
          <LineChart
            data={data}
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
          <ChartWrapper>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${value}`,
              }}
              style={{width: 100, height: 75, resizeMode: 'cover', borderRadius: 10}}
            />
          </ChartWrapper>
        </ChartContainer>
      </Content>
    </ScreenContainer>
  );
};

export default Report;
