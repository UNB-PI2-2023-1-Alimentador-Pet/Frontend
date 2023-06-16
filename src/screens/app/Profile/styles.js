import styled from 'styled-components/native';

import {colors} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.lightGray};
  padding-vertical: ${scale(8)}px;
`;

export const AvatarWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: ${scale(20)}px;
`;
