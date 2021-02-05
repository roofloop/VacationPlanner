import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, dbh } from '../firebase';
import { FAB } from 'react-native-paper';
import logo from '../assets/logo.png';

export default function Home({ navigation }) {
  const [destination, setDestination] = useState([]);
  const userID = auth.currentUser.uid;

  //Get data from firestore.
  useEffect(() => {
    dbh
      .where('creatorId', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newDestination = [];
          querySnapshot.forEach((doc) => {
            const destinations = doc.data();
            destinations.id = doc.id;
            newDestination.push(destinations);
          });
          setDestination(newDestination);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [userID]);

  const renderDestinations = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EditVacationScreen', {
            paramKey: item.id,
            paramText: item.destination,
            paramTodo: item.todo,
          })
        }
        style={styles.destinationContainer}
      >
        <Text style={styles.destinationText}>{item.destination}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.list}>
        {destination && (
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
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {
          navigation.navigate('NewVacationScreen');
        }}
      />
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
  list: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },

  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  destinationContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  destinationText: {
    fontSize: 20,
    color: '#333333',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
