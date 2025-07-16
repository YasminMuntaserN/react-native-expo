import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/utitles/constatnts'


export default function Title({ title }: { title: string }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 5,
    borderColor: COLORS.Primary000,
    padding: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
})