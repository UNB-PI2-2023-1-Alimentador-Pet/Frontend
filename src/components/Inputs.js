import styled from 'styled-components/native';

import {colors} from '../utils/colors';
import {scale} from '../utils/scalling';

export const InputPrimary = styled.TextInput.attrs({
  placeholderTextColor: colors.darkGray,
  autoCapitalize: 'none',
  multiline: false,
})`
  width: 100%;
  background-color: ${props => (props.light ? colors.light : colors.lightGray)};
  border-radius: ${scale(12)}px;
  font-size: ${scale(14)}px;
  font-family: 'Inter-Regular';
  color: ${colors.dark};
  padding-vertical: ${scale(14)}px;
  padding-horizontal: ${scale(20)}px;
  margin-bottom: ${scale(22)}px;
`;
