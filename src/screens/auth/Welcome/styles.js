import styled from 'styled-components/native';

import {colors} from '../../../utils/colors';
import {scale, vPercentage} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.light};
  padding: ${scale(20)}px;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled.View`
  width: 100%;
`;

export const Logo = styled.Image`
  width: 100%;
  height: ${scale(75)}px;
  resize-mode: contain;
  margin-top: ${vPercentage(10)}px
  margin-bottom: ${vPercentage(22)}px;
`;
