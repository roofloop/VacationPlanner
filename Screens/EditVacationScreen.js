import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal } from 'react-native';
import { FlatList, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { auth, dbh } from '../firebase';
import { FAB } from 'react-native-paper';
import { FireBaseContext } from '../context/FireBaseContext';
import { stylesModal } from '../Styles/stylesModal';

export default function NewVacationScreen({ route, navigation }) {
  const paramKey = route.params.paramKey;
  const paramText = route.params.paramText;
  const paramTodo = route.params.paramTodo;

  const [vacationTodoText, setVacationTodoText] = useState();
  const [todo, setTodo] = useState([]);


  const { updateToDb, deleteFromDb, todoSaveDb } = useContext(FireBaseContext);

  const [ModalVisible, setModalVisible] = useState(false);

  /* const updateToFirestore = () => {
    updateToDb(vacationTodoText, paramText, paramKey).then(
      Keyboard.dismiss(),
      navigation.navigate('Home')
    );
  };
  const deleteFromFirestore = () => {
    deleteFromDb(paramKey).then(
      Keyboard.dismiss(),
      navigation.navigate('Home')
    );
  }; */


  const userID = auth.currentUser.uid;

  //Get data from firestore.
  useEffect(() => {
    dbh
      .doc(paramKey)
      .collection('todos')
      .where('creatorId', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newTodo = [];
          querySnapshot.forEach((doc) => {
            const todos = doc.data();
            todos.id = doc.id;
            newTodo.push(todos);
          });
          setTodo(newTodo);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const renderTodos = ({ item }) => {
    return (
      <TouchableOpacity style={styles.destinationContainer}>
        <Text style={styles.titleText}>{item.todo}</Text>
      </TouchableOpacity>
    );
  };

  const addTodoToFirestore = () => {
    todoSaveDb(vacationTodoText, paramKey);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{'Destination: ' + paramText}</Text>

      {/* <TextInput
        placeholder="Add what to do on Vacation here"
        value={vacationTodoText}
        onChangeText={(text) => setVacationTodoText(text)}
        mode="flat"
        multiline={true}
        style={styles.text}
        scrollEnabled={true}
        returnKeyType="done"
        blurOnSubmit={true}
      /> */}

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setModalVisible(true)}
      />

      {/* <FAB
        style={styles.fabCancel}
        small
        icon="close"
        onPress={() => {
          Alert.alert(
            'Deleting vacation input',
            'Are you sure you want to delete this vacation from your planner?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'Delete', onPress: deleteFromFirestore },
            ],
            { cancelable: false }
          );
          //navigation.navigate("NewVacationScreen")
        }}
      /> */}

      <View style={styles.list}>
        {todo && (
          <View style={styles.listContainer}>
            <FlatList
              data={todo}
              renderItem={renderTodos}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Text style={stylesModal.modalText}>
              Add something to do on your vacation!
            </Text>

            <TextInput
              placeholder="Add what to do on Vacation here"
              value={vacationTodoText}
              onChangeText={(text) => setVacationTodoText(text)}
              mode="flat"
              multiline={true}
              style={styles.text}
              scrollEnabled={true}
              returnKeyType="done"
              blurOnSubmit={true}
            />

            <FAB
              style={styles.fab}
              small
              icon="check"
              onPress={addTodoToFirestore}
            />
            <FAB
              style={styles.fabCancel}
              small
              icon="cancel"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
  DeleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
  },
  fabCancel: {
    position: 'absolute',
    backgroundColor: 'red',
    margin: 20,
    left: 0,
    bottom: 0,
  },

  list: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },

  destinationContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  text: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    marginTop: 100,
    fontSize: 16,
  },
});
