import styled from 'styled-components/native';

import {colors} from '../utils/colors';
import {scale, percentage} from '../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.light};
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: scale(14),
    flexGrow: 1,
  },
})``;

export const ContentContainer = styled.View`
  width: 100%;
  padding-horizontal: ${scale(28)}px;
`;

export const SwiperContainer = styled.View`
  width: ${percentage(100)}px;
  padding-horizontal: ${scale(28)}px;
`;

export const Title = styled.Text`
  font-size: ${scale(19)}px;
  font-family: 'Inter-SemiBold';
  color: ${colors.dark};
  margin-bottom: ${scale(60)}px;
`;

export const StepText = styled.Text`
  font-size: ${scale(14)}px;
  font-family: 'Inter-Medium';
  color: ${colors.darkGray};
  margin-bottom: ${scale(22)}px;
`;

export const SubTitleSecondary = styled.Text`
  font-family: 'Inter-SemiBold';
  font-size: ${scale(14)}px;
  color: ${colors.dark};
  margin-bottom: ${scale(24)}px;
  text-align: center;
`;

export const Tooltip = styled.View`
  padding: ${scale(20)}px;
  margin-bottom: ${scale(18)}px;
  flex-direction: row;
`;

export const TooltipIconWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: ${scale(14)}px;
`;

export const TooltipTextWrapper = styled.View`
  flex: 1;
`;

export const TooltipText = styled.Text`
  font-family: 'Inter-Medium';
  font-size: ${scale(12)}px;
  color: ${colors.darkGray};
`;
