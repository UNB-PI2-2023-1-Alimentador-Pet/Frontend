import styled from 'styled-components/native';

import {TouchableOpacity} from 'react-native';

import {colorsLight} from '../../utils/colors';
import {scale, percentage} from '../../utils/scalling';

export const ButtonPrimary = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  background-color: ${colorsLight.primarycolor};
  border-radius: ${scale(12)}px;
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${scale(14)}px;
  margin-bottom: ${scale(16)}px;
`;

export const ButtonText = styled.Text`
  color: ${colorsLight.dark};
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  text-align: center;
  width: 100%;
`;
