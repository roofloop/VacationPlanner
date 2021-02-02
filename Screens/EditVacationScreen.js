import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, Alert } from 'react-native';

import { FAB } from 'react-native-paper'
import { FireBaseContext } from '../context/FireBaseContext';



export default function NewVacationScreen({ route, navigation }) {

    const paramKey = route.params.paramKey
    const paramText = route.params.paramText
    const paramTodo = route.params.paramTodo

    const [vacationTodoText, setVacationTodoText] = useState(paramTodo)

    const { updateToDb, deleteFromDb } = useContext(FireBaseContext);


    const updateToFirestore = () => {
        updateToDb(vacationTodoText, paramText, paramKey).then(
          Keyboard.dismiss(),
          navigation.navigate("Home"))
      }
    const deleteFromFirestore = () => {
        deleteFromDb(paramKey).then(
          Keyboard.dismiss(),
          navigation.navigate("Home"))
      }


    return (

        <View style={styles.container}>


            <Text style={styles.titleText}>

                {"Destination: " + paramText}

            </Text>


            <TextInput
                placeholder='Add what to do on Vacation here'
                value={vacationTodoText}
                onChangeText={(text) => setVacationTodoText(text)}
                mode='flat'
                multiline={true}
                style={styles.text}
                scrollEnabled={true}
                returnKeyType='done'
                blurOnSubmit={true}
            />

            <FAB
                style={styles.fab}
                small
                icon='check'
                onPress={updateToFirestore}

            />
            <FAB
                style={styles.fabCancel}
                small
                icon='close'
                onPress={() => {
                    Alert.alert(
                        'Deleting vacation input',
                        'Are you sure you want to delete this vacation from your planner?',
                        [

                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            { text: 'Delete', onPress: deleteFromFirestore }
                        ],
                        { cancelable: false }
                    );
                    //navigation.navigate("NewVacationScreen")
                }}

            />


        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    DeleteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    titleText: {
        alignSelf: 'center',
        fontSize: 24,
        marginBottom: 20
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0
    },
    fabCancel: {
        position: 'absolute',
        backgroundColor: 'red',
        margin: 20,
        left: 0,
        bottom: 0
    },

    text: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: "white",
        marginTop: 100,
        height: 300,
        fontSize: 16
    },


})

