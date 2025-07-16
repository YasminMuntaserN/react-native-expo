import StartGame from "@/Screens/StartGame";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import PlayGame from "@/Screens/PlayGame";
import { useGame } from "@/context/GameContext";
import GameOver from "@/Screens/GameOver";

export default function Index() {
  const { number, screen } = useGame();

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../assets/images/background.png')}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(237, 199, 31, 0.3)', 'rgba(142, 126, 18, 0.5)', 'rgba(106, 25, 93, 0.8)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          {screen === 'PlayGame' ? <PlayGame /> : screen === 'GameOver' ? <GameOver /> : <StartGame />}
        </SafeAreaView >
      </LinearGradient >
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 100
    // paddingHorizontal: 20,
    // justifyContent: 'center',
  },
});