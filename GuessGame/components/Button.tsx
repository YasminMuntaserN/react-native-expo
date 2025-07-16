import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'

export default function Button({ text, onClick }: { text: string, onClick?: (event: GestureResponderEvent) => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.text} >{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 50,
    backgroundColor: '#8B698C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  }
});