import styled from 'styled-components/native';

import {colors} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightGray};
  padding: ${scale(20)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: ${scale(30)}px;
`;

export const LeadingTitle = styled.Text`
  font-family: 'Inter-Medium';
  font-size: ${scale(16)}px;
  color: ${colors.dark};
  margin-bottom: ${scale(20)}px;
  font-weight: 500;
  margin-right: ${scale(20)}px;
  max-width: ${scale(100)}px;
`;

export const AudioSelect = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  background-color: ${colors.light};
  margin-right: ${scale(20)}px;
  width: ${scale(190)}px;
  border-radius: ${scale(10)}px;
  display: flex;
  justify-content: space-between;
  padding-right: ${scale(10)}px;
`;

export const AudioTextSelect = styled.Text`
  font-family: 'Inter-Medium';
  font-size: ${scale(14)}px;
  font-weight: 400;
  max-width: ${scale(100)}px;
  margin-left: ${scale(10)}px;
`;

export const SaveButton = styled.Text`
  justify-content: center;
  line-height: 50px;
  text-align: center;
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
  background-color: ${colors.primary};
  font-weight: 600;
  color: #000;
  height: 50px;
`;
