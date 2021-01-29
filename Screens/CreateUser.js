import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';

export default function CreateUser() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signUp } = useContext(AuthContext)

    const submitSignUp = () => {
        signUp(email, password)
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Create User</Text>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Username"
                value={userName}
                onChangeText={setUserName} />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail} />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                style={styles.textInput}
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword} />
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity
                style={button.customButton}
                onPress={submitSignUp}>
                    <Text style={{ fontSize: 18 }}>Submit</Text>
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
        //justifyContent: 'center',
    },
    inputView: {
        padding: 10,
    },
    textInput: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 10,
        width: 200
    },
});

const button = StyleSheet.create({
    customButton: {
        backgroundColor: '#ffb957',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        width: 160
    }
})