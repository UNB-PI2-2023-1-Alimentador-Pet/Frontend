import styled from 'styled-components/native';

import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.light};
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: colors.light,
    padding: scale(24),
  },
})``;

export const Header = styled.View`
  width: 100%;
  background-color: ${colors.primary};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${scale(10)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: ${scale(10)}px;
  border-bottom-width: 0.5px;
  border-color: ${colors.darkGray};
  padding-horizontal: ${scale(14)}px;
`;

export const Content = styled.View`
  flex: 1;
  padding-horizontal: ${scale(14)}px;
`;

export const HomeTitle = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
  margin-bottom: ${scale(10)}px;
`;
