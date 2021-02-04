import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { FAB } from 'react-native-paper';
import { FireBaseContext } from '../context/FireBaseContext';

export default function NewVacationScreen({ navigation }) {
  const [destinationText, setDestinationText] = useState('');
  const [vacationTodoText, setVacationTodoText] = useState('');

  const { saveToDb } = useContext(FireBaseContext);

  const writeToFirestore = () => {
    saveToDb(destinationText, vacationTodoText).then(
      Keyboard.dismiss(),
      navigation.navigate('Home')
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add destination here"
        value={destinationText}
        mode="outlined"
        onChangeText={setDestinationText}
        style={styles.title}
      />

      <TextInput
        placeholder="Add what to do on Vacation here"
        value={vacationTodoText}
        onChangeText={setVacationTodoText}
        mode="flat"
        multiline={true}
        style={styles.text}
        scrollEnabled={true}
        returnKeyType="done"
        blurOnSubmit={true}
      />

      <FAB style={styles.fab} small icon="check" onPress={writeToFirestore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
