import styled from 'styled-components/native';

import {colors} from '../../utils/colors';
import {scale} from '../../utils/scalling';

export const LoadingBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styled.View`
  border-radius: ${scale(12)}px;
  background-color: ${colors.light};
  padding: ${scale(22)}px;
`;
