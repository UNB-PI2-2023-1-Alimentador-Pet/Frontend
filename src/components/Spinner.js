import React, {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

const Spinner = props => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        ...props.style,
        transform: [{rotate: spin}],
      }}>
      {props.children}
    </Animated.View>
  );
};

export default Spinner;
