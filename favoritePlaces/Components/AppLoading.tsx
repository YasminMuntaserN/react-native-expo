import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
const AppLoading = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const ball1Translate = useRef(new Animated.Value(0)).current;
  const ball2Translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(ball1Translate, {
          toValue: 15,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(ball1Translate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(ball2Translate, {
          toValue: -15,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(ball2Translate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, { transform: [{ rotate: rotateInterpolate }] }]}>
        <Animated.View
          style={[
            styles.ball,
            styles.ball1,
            { transform: [{ translateX: ball1Translate }, { translateY: ball1Translate }] },
          ]}
        />
        <Animated.View
          style={[
            styles.ball,
            styles.ball2,
            { transform: [{ translateX: ball2Translate }, { translateY: ball2Translate }] },
          ]}
        />
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  ball1: {
    backgroundColor: 'rgb(36, 103, 56)',
  },
  ball2: {
    backgroundColor: '#ff3d00',
  },
});

export default AppLoading