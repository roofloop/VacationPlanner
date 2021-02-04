import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp } = useContext(AuthContext);

  const submitSignUp = () => {
    signUp(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Create a new user</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          keyboardType="email-address"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        <TouchableOpacity style={button.customButton} onPress={submitSignUp}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
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
  inputView: {
    padding: 10,
  },
  textInput: {
    backgroundColor: '#465881',

    borderRadius: 10,
    padding: 10,
    width: 200,
  },
  headText: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 20,
    top: 0,
  },
  submitText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

const button = StyleSheet.create({
  customButton: {
    backgroundColor: '#46816f',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 160,
    margin: 50,
  },
});
