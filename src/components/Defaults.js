import styled from 'styled-components/native';

import {colorsLight} from '../utils/colors';
import {scale, percentage} from '../utils/scalling';

export const Title = styled.Text`
  font-size: ${scale(24)}px;
  font-family: 'Inter-SemiBold';
  color: ${colorsLight.dark};
  margin-bottom: ${scale(24)}px;
`;

export const SubTitle = styled.Text`
  font-size: ${scale(14)}px;
  font-family: 'Inter-Medium';
  color: ${colorsLight.darkGray};
  margin-bottom: ${scale(24)}px;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: colorsLight.gray,
  autoCapitalize: 'none',
  multiline: false,
})`
  width: 100%;
  background-color: ${colorsLight.mediumGray};
  border-radius: ${scale(12)}px;
  font-size: ${scale(14)}px;
  font-family: 'Inter-Regular';
  color: ${colorsLight.dark};
  padding-vertical: ${scale(14)}px;
  padding-horizontal: ${scale(20)}px;
  margin-bottom: ${scale(18)}px;
`;

export const ScrollViewStyled = styled.ScrollView.attrs({
  contentContainerStyle: {
    backgroundColor: colorsLight.light,
    // padding: scale(24),
    flexGrow: 1,
  },
})``;

export const Item = styled.View`
  width: 100%;
  background-color: ${colorsLight.mediumGray};
  border-radius: ${scale(12)}px;
  padding: ${scale(20)}px;
  margin-bottom: ${scale(18)}px;
`;

export const ItemTitle = styled.Text`
  font-size: ${scale(14)}px;
  font-family: 'Inter-SemiBold';
  color: ${colorsLight.dark};
  margin-bottom: ${scale(10)}px;
`;
