import React from 'react';
import {ActivityIndicator, Modal, StatusBar} from 'react-native';

import {LoadingBackground, LoadingWrapper} from './styles';
import {colors} from '../../utils/colors';

const LoadingModal = props => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.49)" />
      <LoadingBackground>
        <LoadingWrapper>
          <ActivityIndicator size="large" color={colors.darkGray} />
        </LoadingWrapper>
      </LoadingBackground>
    </Modal>
  );
};

export default LoadingModal;
