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
