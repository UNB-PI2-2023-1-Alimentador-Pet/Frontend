import styled from 'styled-components/native';

import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const Container = styled.View`
  flex: 1;
  background-color: ${colorsLight.lightGray};
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
