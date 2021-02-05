import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { colors } from 'material-ui/styles';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useContext(AuthContext);

  const submit = () => {
    console.log('submitting logIn');
    logIn(email, password);
  };

  const createUser = () => {
    navigation.navigate('CreateUser');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.form}>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="black"
          keyboardType="email-address"
          style={styles.TextInputEmail}
        />

        <TextInput
          placeholder="Enter password"
          value={password}
          secureTextEntry={true}
          placeholderTextColor="black"
          onChangeText={setPassword}
          style={styles.TextInputPassword}
        />

        <TouchableOpacity style={button.customButton} onPress={submit}>
          <Text style={styles.submitText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={button.customButton} onPress={createUser}>
          <Text style={styles.submitText}>Create User</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
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
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
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
  submitText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

const button = StyleSheet.create({
  customButton: {
    backgroundColor: '#46816f',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
});
