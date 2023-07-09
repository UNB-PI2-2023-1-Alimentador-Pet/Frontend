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
`;

export const ChartWrapper = styled.View`
  background-color: ${colors.light};
  border-radius: ${scale(12)}px;
  justify-content: center;
  padding: ${scale(18)}px;
  margin-bottom: ${scale(10)}px;
`;
