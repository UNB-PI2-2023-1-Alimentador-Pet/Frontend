import styled from 'styled-components/native';

import {colorsLight} from '../../../utils/colors';
import {scale} from '../../../utils/scalling';

export const Container = styled.View`
  flex: 1;
  background-color: ${colorsLight.light};
  padding: ${scale(20)}px;
  align-items: center;
  justify-content: center;
`;

export const ContainerLogo = styled.View`
  flex: 1;
  width: 100%;
`;

export const Logo = styled.Image`
  height: ${scale(100)}px;
  resize-mode: contain;
  margin-bottom: ${scale(20)}px;
`;
