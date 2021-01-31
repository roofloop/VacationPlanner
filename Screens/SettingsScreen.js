import React, { useContext } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {

  const { signOut } = useContext(AuthContext);
  const submit = () => {
    signOut();

  };

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button style={styles.button} title="Sign Out" onPress={submit} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    marginTop: 100,
  }
});
