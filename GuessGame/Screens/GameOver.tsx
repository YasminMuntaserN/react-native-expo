import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Title from '@/components/Title'
import { useGame } from '@/context/GameContext'
import { COLORS } from '@/utitles/constatnts';
import Button from '@/components/Button';

export default function GameOver() {
  const { number, guessedNumbers, clearTheGame } = useGame();
  return (
    <View style={styles.cointainer}>
      <Title title='Game Over' />
      <Image style={styles.imageCointainer} source={require('../assets/images/success.png')} resizeMode='cover' />
      <Text style={styles.description}>Your phone needed
        <Text style={styles.span}>{guessedNumbers?.length}</Text>
        roundes to guess the number
        <Text style={styles.span}>{number}</Text>.</Text>
      <Button text='Play Again' onClick={() => clearTheGame()} />
    </View>
  )
}

const styles = StyleSheet.create({
  cointainer: {
    flex: 1,
    alignItems: 'center'
  },
  imageCointainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
  },
  description: {
    fontSize: 20,
    color: '',
    fontWeight: '700',
    textAlign: 'center',
    margin: 20,
    letterSpacing: 2

  },
  span: {
    fontSize: 25,
    color: COLORS.Primary000,
    fontWeight: '900',
    textAlign: 'center',
  }
})