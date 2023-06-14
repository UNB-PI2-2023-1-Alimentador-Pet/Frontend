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
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${scale(14)}px;
  margin-bottom: ${scale(20)}px;
`;

export const Content = styled.View`
  flex: 1;
  padding-horizontal: ${scale(14)}px;
`;

export const HomeTitle = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
  margin-bottom: ${scale(20)}px;
`;
