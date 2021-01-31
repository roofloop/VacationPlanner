import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function NewVacationScreen() {
  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: 'bold' }}>New Vacation</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter destination"
        />
      </View>
    
      <View style={styles.inputView}>
        <TouchableOpacity
          style={button.customButton}
          >
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
      padding: 150,
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
        width: 160,
        marginBottom:20

  }
})