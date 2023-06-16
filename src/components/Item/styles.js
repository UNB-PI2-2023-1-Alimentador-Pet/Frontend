import styled from 'styled-components/native';

import {colors} from '../../utils/colors';
import {scale} from '../../utils/scalling';

export const ItemContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: props.onPress ? 0.5 : 1,
}))`
  width: 100%;
  background-color: ${props => (props.gray ? colors.lightGray : colors.light)};
  border-radius: ${scale(12)}px;
  padding: ${scale(16)}px;
  margin-bottom: ${scale(18)}px;
  flex-direction: row;
`;

export const ItemImage = styled.Image`
  width: ${scale(44)}px;
  height: ${scale(54)}px;
  border-radius: ${scale(4)}px;
  resize-mode: contain;
  margin-right: ${scale(18)}px;
`;

export const ItemIcon = styled.View`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(48)}px;
  margin-right: ${scale(18)}px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;

export const ItemContent = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const ItemTitle = styled.Text`
  font-family: 'Inter-Medium';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
`;

export const ItemSubtitle = styled.Text`
  font-family: 'Inter-Regular';
  font-size: ${scale(12)}px;
  color: ${colors.darkGray};
  margin-top: ${scale(6)}px;
`;

export const ItemAction = styled.View`
  justify-content: center;
`;

export const ItemButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  padding-vertical: ${scale(8)}px;
`;
