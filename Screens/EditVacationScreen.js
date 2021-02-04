import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, Alert, FlatList, TouchableOpacity } from 'react-native';
import { auth, dbh } from "../firebase";

import { FAB } from 'react-native-paper'
import { FireBaseContext } from '../context/FireBaseContext';


export default function NewVacationScreen({ route, navigation }) {

    const paramKey = route.params.paramKey
    const paramText = route.params.paramText
    const paramTodo = route.params.paramTodo
    const destArray = route.params.paramDestinationArray

    const [vacationTodoText, setVacationTodoText] = useState(paramTodo)

    const { updateToDb, deleteFromDb } = useContext(FireBaseContext);
    const [list, setList] = useState([]);
    
    const [userDetails, setUserDetails] = useState('')

    //Get data from firestore.
    useEffect(() => {
        
        const newDestination = []

        dbh.doc(paramKey).get().then(
            
            snapshot => setUserDetails(snapshot.data()))

    });

    const userDet = () => {

        const newDestination = []
        newDestination.push(userDetails)

        console.log(JSON.stringify(newDestination));

        setList(newDestination)

    }


    const renderDestinations = ({ item }) => {
        return (

            <TouchableOpacity style={styles.destinationContainer}>

                <Text style={styles.destinationText}>

                    {JSON.stringify(item.todo)}

                </Text>
                
            </TouchableOpacity>
        )
    }


    const updateToFirestore = () => {
        if (vacationTodoText && vacationTodoText.length > 0) {
            updateToDb(vacationTodoText, paramText, paramKey).then(
                Keyboard.dismiss(),
                navigation.navigate("Home"))
        }
    }



    const deleteFromFirestore = () => {
        deleteFromDb(paramKey).then(
            Keyboard.dismiss(),
            navigation.navigate("Home"))
    }


    return (

        <View style={styles.container}>

            { list && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={list}
                        renderItem={renderDestinations}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}


            {/* <Text style={styles.titleText}>

                {"Destination: " + paramText}

            </Text> */}


            {/* <TextInput
                placeholder='Add what to do on Vacation here'
                value={vacationTodoText}
                onChangeText={(text) => setVacationTodoText(text)}
                mode='flat'
                multiline={true}
                style={styles.text}
                scrollEnabled={true}
                returnKeyType='done'
                blurOnSubmit={true}
            /> */}

            <FAB
                style={styles.fab}
                small
                icon='check'
                onPress={() => console.log(JSON.stringify(list))

            }

        />
            <FAB
                style={styles.fabCenter}
                small
                icon='check'
                onPress={() => userDet()
                }

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
    fabCenter: {
        position: 'absolute',
        margin: 20,
        right: 100,
        bottom: 0
    },
    destinationText: {
        fontSize: 20,
        color: '#333333'
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
    listContainer: {
        marginTop: 20,
        padding: 20,
    },


})

