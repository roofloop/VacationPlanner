import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import { colors } from 'material-ui/styles';

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
      <View style={styles.form}>
        <TextInput
          style={styles.TextInputEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.TextInputPassword}
          placeholder="Enter Password"
          placeholderTextColor="black"
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
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  TextInputPassword: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    height: 40,
    marginBottom: 20,
  },
  TextInputEmail: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    height: 40,
    marginBottom: 20,
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
