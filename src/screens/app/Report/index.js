import React from 'react';
import {Gauge, PawPrint} from 'phosphor-react-native';
import {LineChart} from 'react-native-gifted-charts';

import {ScreenContainer, ChartContainer, ChartWrapper} from './styles';
import {Content} from '../Home/styles';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

const Report = ({navigation}) => {
  const data = [
    {value: 40, label: 'Dom'},
    {value: 50, label: 'Seg'},
    {value: 80, label: 'Ter'},
    {value: 90, label: 'Qua'},
    {value: 70, label: 'Qui'},
    {value: 20, label: 'Sex'},
    {value: 30, label: 'Sab'},
  ];

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
          </ChartWrapper>

          <ChartWrapper>
          </ChartWrapper>
        </ChartContainer>
      </Content>
    </ScreenContainer>
  );
};

export default Report;
