import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/utitles/constatnts'


export default function Container({ children }) {
  return (
    <View style={styles.inputContainer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.Primary001,
    padding: 50,
    borderRadius: 18,
    marginBottom: 20,
    width: 380,
    // display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})