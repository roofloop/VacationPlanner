import React, { useContext } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  //Signout function
  const submit = () => {
    navigation.goBack();
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    marginTop: 100,
  },
});
