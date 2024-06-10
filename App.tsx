import {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Animated, ImageBackground, Dimensions} from 'react-native';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
    Animated.timing(moonAnimation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }),
    { iterations: -1 } // loop infinito
    ).start();
  }, [moonAnimation]);

  const resetAnimation = () => {
    moonAnimation.setValue(0);
  };

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const moonLeft = moonAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['0%', '90%']
  });

  const moonBottom = moonAnimation.interpolate({
    inputRange: [0,1],
    outputRange: [0, screenHeight * 0.9]
  });

  const moonColor = moonAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['yellow', 'orange', 'black', 'orange', 'yellow']
  });

  return (
    <ImageBackground source={require('./assets/img/mx-satelital-2.jpg')} style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.titulo}>Eclipse total México 2024 </Text>
      <View style={styles.sun} /><View/>
      <Animated.View style={[styles.moon, {left: moonLeft, bottom: moonBottom, backgroundColor: moonColor}]} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  titulo:{
    color: 'black',
    alignItems: 'center',
    fontSize: 30,
    marginTop: 20, 
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderWidth: 1, 
    alignContent: 'center',
  },
  moon: {
    position: 'absolute',
    bottom: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    zIndex: 1,
  },
  sun: {
    position: 'absolute',
    bottom: '50%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'orange',
  },
});