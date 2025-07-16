import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/utitles/constatnts'
import Button from '../components/Button'
import Container from '@/components/Container'
import Title from '@/components/Title'
import { useGame } from '@/context/GameContext'

export default function StartGame() {
  const { number, setNumber, setScreen } = useGame();
  return (
    <ScrollView style={{ flex: 1 }} >
      <KeyboardAvoidingView
        behavior='position'
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Title title='Guess My Number 🔢' />
          <Container>
            <Text style={styles.title}>Enter A Number</Text>

            <TextInput
              style={styles.input}
              onChangeText={(text) => setNumber(Number(text))}
              placeholder="Enter number"
              keyboardType="numeric"
              maxLength={10}
            />
            <View style={styles.buttonsCointaner}>
              <Button text="Reset" onClick={() => setNumber(0)} />
              <Button text="Continue" onClick={() => setScreen('PlayGame')} />
            </View>

          </Container>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 10,
    margin: 20,
    color: '#ccc'
  },
  buttonsCointaner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
