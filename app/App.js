import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import Spring from './components/Spring';

export default function App() {
  return (
    <View style={styles.container}>
      <Spring />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
