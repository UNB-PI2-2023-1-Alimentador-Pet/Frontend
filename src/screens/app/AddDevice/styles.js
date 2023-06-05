import styled from 'styled-components/native';

import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const Container = styled.View`
  flex: 1;
  background-color: ${colorsLight.light};
  padding: ${scale(20)}px;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${colorsLight.primary};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${scale(10)}px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const HomeTitle = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colorsLight.dark};
  margin-bottom: ${scale(10)}px;
`;

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
