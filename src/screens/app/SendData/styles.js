import styled from 'styled-components/native';

import {colors} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${colors.light};
  padding: ${scale(20)}px;
`;
