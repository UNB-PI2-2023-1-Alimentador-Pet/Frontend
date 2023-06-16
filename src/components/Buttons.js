import styled from 'styled-components/native';

import {colors} from '../utils/colors';
import {scale} from '../utils/scalling';

export const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: ${scale(12)}px;
`;

export const ButtonPrimary = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  background-color: ${colors.primary};
  border-radius: ${scale(12)}px;
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${scale(14)}px;
  margin-bottom: ${scale(16)}px;
`;

export const ButtonSecondary = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  border-radius: ${scale(12)}px;
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${scale(14)}px;
  margin-bottom: ${scale(16)}px;
`;

export const ButtonText = styled.Text`
  color: ${colors.dark};
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  text-align: center;
  width: 100%;
`;
