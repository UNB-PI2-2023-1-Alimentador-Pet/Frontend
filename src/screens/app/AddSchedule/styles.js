import styled from 'styled-components/native';
import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightGray};
  padding-vertical: ${scale(8)}px;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${colors.primary};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${scale(10)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const LeadingTitle = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
  margin-bottom: ${scale(20)}px;
  font-weight: 500;
  margin-right: 60px;
  max-width: 90px;
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
