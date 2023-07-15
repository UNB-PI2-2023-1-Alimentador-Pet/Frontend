import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightGray};
`;

const shadow = `
  shadow-color: ${colors.dark};
  shadow-offset: 2px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 10;
`;

export const FeedContainer = styled(LinearGradient).attrs({
  colors: [colors.primary, colors.secondary],
})`
  border-bottom-left-radius: ${scale(50)}px;
  border-bottom-right-radius: ${scale(50)}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-horizontal: ${scale(22)}px;
  padding-vertical: ${scale(30)}px;
  margin-bottom: ${scale(24)}px;
`;

export const FeedButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  border-radius: ${scale(150)}px;
  background-color: ${colors.light};
  justify-content: center;
  align-items: center;
  margin-right: ${scale(12)}px;
  margin-left: ${scale(12)}px;
  padding: ${scale(4)}px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  ${shadow}
`;

export const Feed = styled.View`
  border-radius: ${scale(150)}px;
  border-width: 1px;
  border-color: ${colors.primary};
  width: ${scale(155)}px;
  height: ${scale(155)}px;
  justify-content: center;
`;

export const BowlImage = styled.Image`
  width: 100%;
  height: ${scale(52)}px;
  resize-mode: contain;
  margin-bottom: ${scale(22)}px;
`;

export const FeedText = styled.Text`
  font-size: ${scale(14)}px;
  font-family: 'Inter-Medium';
  color: ${colors.secondary};
  text-align: center;
`;

export const ActionsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  border-radius: ${scale(50)}px;
  background-color: ${colors.light};
  padding: ${scale(10)}px;
  ${shadow}
`;
