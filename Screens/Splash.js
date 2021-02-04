import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text>Vacation Planner</Text>
      <ActivityIndicator animating={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
