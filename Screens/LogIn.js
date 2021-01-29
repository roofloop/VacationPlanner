import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContext';

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useContext(AuthContext);

    const submit = () => {
        console.log('submitting logIn')
        logIn(email, password);

    };

    const createUser = () => {
      console.log("Creating User")
      navigation.navigate("CreateUser")
  }

  return (
    <View style={styles.container}>
        <Text style={styles.inputext}> Sign In  </Text>
        
        <TextInput placeholder = "Enter Email" 
        value= {email} onChangeText = {setEmail} 
        placeholderTextColor="#FFFFFF" 
        keyboardType="email-address"
        style={styles.TextInputEmail} />

        <TextInput placeholder = "Enter password" 
        value={password} secureTextEntry={true} 
        placeholderTextColor="#FFFFFF" 
        onChangeText={setPassword} 
        style={styles.TextInputPassword}/>
        
        <View style={styles.inputView}>
            <TouchableOpacity
                style={button.customButton}
                onPress={submit}>
                    <Text style={{ fontSize: 18, color:"#FFFFFF" }}>Sign in</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
            <TouchableOpacity
                style={button.customButton}
                onPress={createUser}>
                    <Text style={{ fontSize: 18, color:"#FFFFFF" }}>Create User</Text>
            </TouchableOpacity>
        </View>

        <Button title="Submit" onPress={submit} />

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
  TextInputPassword: {
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  TextInputEmail: {
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:60,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

const button = StyleSheet.create({
  customButton: {
    backgroundColor: '#ffb957',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: 160,
        marginBottom:20

  }
})


