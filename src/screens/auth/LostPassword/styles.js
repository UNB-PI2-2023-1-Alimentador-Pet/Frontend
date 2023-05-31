import styled from 'styled-components/native';

import {colorsLight} from '../../../utils/colors';
import {scale, percentage} from '../../../utils/scalling';

export const Container = styled.View`
  flex: 1;
  background-color: ${colorsLight.light};
`;

export const ScreenView = styled.View`
  width: ${percentage(100)}px;
  align-items: center;
`;
