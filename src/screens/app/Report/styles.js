import styled from 'styled-components/native';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightGray};
  padding-vertical: ${scale(8)}px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChartWrapper = styled.View`
  background-color: ${colors.light};
  border-radius: ${scale(12)}px;
  justify-content: center;
  padding: ${scale(18)}px;
  margin-bottom: ${scale(10)}px;
`;

export const ChartTitleText = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.secondary};
  margin-bottom: ${scale(12)}px;
  text-align: center;
`;

export const ChartValueText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: ${scale(24)}px;
  color: ${colors.darkGray};
  text-align: center;
`;
