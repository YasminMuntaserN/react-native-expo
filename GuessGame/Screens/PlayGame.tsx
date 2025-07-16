import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Container from '@/components/Container'
import Title from '@/components/Title'
import Button from '@/components/Button';
import { useGame } from '@/context/GameContext';

let minBoundary = 0;
let maxBoundary = 100;

export default function PlayGame() {
  const { generateRandomBetween, number, currentGuess, guessedNumbers, setGuessedNumbers, setCurrentGuess, setScreen } = useGame();

  function nextGuessHandler(direction: string) {
    // direction => 'lower', 'greater'
    if (
      (direction === 'lower' && currentGuess < number) ||
      (direction === 'greater' && currentGuess > number)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setGuessedNumbers([...guessedNumbers, newRndNumber]);
    setCurrentGuess(newRndNumber);

    if (newRndNumber === number) {
      setScreen('GameOver');
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Title title='Opponents Guess' />
      <Title title={currentGuess.toString()} />
      <Container>
        <Text style={styles.title}>Higher or Lower</Text>
        <View style={styles.buttonsCointaner}>
          <Button text="-" onClick={() => nextGuessHandler("lower")} />
          <Button text="+" onClick={() => nextGuessHandler("greater")} />
        </View>
      </Container>
      <FlatList
        data={[...guessedNumbers].reverse()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.guessItem}>
            <Text style={styles.guessText}>
              #{guessedNumbers.length - index}: <Text style={styles.number}>{item}</Text>
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsCointaner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  guessItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  guessText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  number: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});