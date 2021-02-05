import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal } from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { auth, dbh } from '../firebase';
import { FAB } from 'react-native-paper';
import { FireBaseContext } from '../context/FireBaseContext';
import { stylesModal } from '../Styles/stylesModal';

export default function NewVacationScreen({ route }) {
  const paramKey = route.params.paramKey;
  const paramText = route.params.paramText;
  const userID = auth.currentUser.uid;

  const [vacationTodoText, setVacationTodoText] = useState();
  const [todo, setTodo] = useState([]);

  const [ModalVisible, setModalVisible] = useState(false);

  const { deleteTodoFromDb, todoSaveDb } = useContext(FireBaseContext);

  const addTodoToFirestore = () => {
    todoSaveDb(vacationTodoText, paramKey);
    setVacationTodoText('');
    setModalVisible(false);
  };

  //Get data from firestore, order by descending, push data to array.
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
  }, [paramKey, userID]);

  const renderTodos = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            'Delete todo',
            'Are you sure you want to delete this todo?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => deleteTodoFromDb(paramKey, item.id),
              },
            ],
            { cancelable: false }
          );
        }}
        style={styles.destinationContainer}
      >
        <Text style={styles.titleText}>{item.todo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{'Destination: ' + paramText}</Text>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setModalVisible(true)}
      />

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
