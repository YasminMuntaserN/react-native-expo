import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'

interface InputProps {
  label: string;
  invalid?: boolean;
  style?: any;
  textInputConfig?: any;
}
const Input = ({ label, invalid, style, textInputConfig }: InputProps) => {
  const inputStyles: StyleProp<ViewStyle> = [styles.input];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label} : </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },

  label: {
    fontSize: 16,
    color: '#fff',
    margin: 10
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#676E76',
    padding: 16,
    borderRadius: 6,
    fontSize: 16,
    color: '#fff',
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },

  invalidInput: {
    borderColor: 'red',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  }
})