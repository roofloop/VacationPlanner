import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, dbh } from "../firebase";
import { FAB } from 'react-native-paper'

export default function Home({ navigation }) {

  const [destination, setDestination] = useState([])
  const userID = auth.currentUser.uid

  //Get data from firestore.
  useEffect(() => {
    dbh
      .where("creatorId", "==", userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const newDestination = []
          querySnapshot.forEach(doc => {
            const destinations = doc.data()
            destinations.id = doc.id
            newDestination.push(destinations)
          });
          setDestination(newDestination)
        },
        error => {
          console.log(error)
        }
      )
  }, [])
  

  const renderDestinations = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("EditVacationScreen", { paramKey: item.id, paramText: item.destination, paramTodo: item.todo })} style={styles.destinationContainer}>

        <Text style={styles.destinationText}>
          {item.destination}
        </Text>
      </TouchableOpacity>
    )
  }

  return (

    <View style={styles.container}>

      <FAB
        style={styles.fab}
        small
        icon='plus'
        onPress={() => {
          navigation.navigate("NewVacationScreen")
        }}

      />

      { destination && (
        <View style={styles.listContainer}>
          <FlatList
            data={destination}
            renderItem={renderDestinations}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  destinationContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16
  },
  destinationText: {
    fontSize: 20,
    color: '#333333'
  },
  baseText: {
    fontFamily: "Cochin"
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  }

});