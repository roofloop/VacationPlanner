import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Modal, TouchableHighlight, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FAB } from 'react-native-paper'
import { FireBaseContext } from '../context/FireBaseContext';


export default function NewVacationScreen({ navigation }) {

  const [destinationText, setDestinationText] = useState('')
  const [vacationTodoText, setVacationTodoText] = useState('')

  const [DestModalVisible, setDestModalVisible] = useState(true);
  const [ToDoModalVisible, setTodoModalVisible] = useState(false);

  const [list, setList] = useState([]);

  const { saveToDb } = useContext(FireBaseContext);

  const handleRemove = (id) => {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  const writeToFirestore = () => {
    if (destinationText && destinationText.length && vacationTodoText && vacationTodoText.length > 0) {

      saveToDb(destinationText, list).then(
        Keyboard.dismiss(),
        navigation.navigate("Home"))

    } else { alert(`Textfields must not be empty!`) }

  }


 

  const renderDestinations = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        Alert.alert(
          'Deleting vacation input',
          'Are you sure you want to delete this vacation from your planner?',
          [

            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: 'Delete', onPress: ()=> handleRemove(item.id) }
          ],
          { cancelable: false }
        );
        //navigation.navigate("NewVacationScreen")
      } 
  } style = { styles.destinationContainer } >

    <Text style={styles.destinationText}>
      {item.todo}
    </Text>
      </TouchableOpacity >
    )
}



return (

  <View style={styles.container}>

    <Text style={styles.destinationText}>
      {destinationText}
    </Text>


    {/* 
      <TextInput
        placeholder='Add what to do on Vacation here'
        value={vacationTodoText}
        onChangeText={setVacationTodoText}
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
      onPress={writeToFirestore}>

    </FAB>

    <FAB
      style={styles.fabLeft}
      small
      icon='plus'
      onPress={() => {
        setTodoModalVisible(true);
      }}>
    </FAB>

    <Modal
      animationType="fade"
      transparent={true}
      visible={DestModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={stylesModal.centeredView}>
        <View style={stylesModal.modalView}>
          <Text style={stylesModal.modalText}>New Destination</Text>

          <TextInput
            placeholder='Add destination here'
            onChangeText={setDestinationText}
            mode='flat'
            multiline={true}
            style={styles.text}
            scrollEnabled={true}
            returnKeyType='done'
            blurOnSubmit={true}
          />

          <TouchableHighlight
            style={{ ...stylesModal.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setDestModalVisible(!DestModalVisible);
              setTodoModalVisible(true);

            }}>
            <Text style={stylesModal.textStyle}>Accept</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...stylesModal.openButtonLeft, backgroundColor: '#2196F3' }}
            onPress={() => {
              setDestModalVisible(!DestModalVisible);
            }}>
            <Text style={stylesModal.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>





    <Modal
      animationType="fade"
      transparent={true}
      visible={ToDoModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={stylesModal.centeredView}>
        <View style={stylesModal.modalView}>
          <Text style={stylesModal.modalText}>New To-Do!</Text>

          <TextInput
            placeholder='Add what to do on Vacation here'
            onChangeText={setVacationTodoText}
            mode='flat'
            multiline={true}
            style={styles.text}
            scrollEnabled={true}
            returnKeyType='done'
            blurOnSubmit={true}
          />

          <TouchableHighlight
            style={{ ...stylesModal.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setList([...list, { id: list.length + 1, todo: vacationTodoText }]);
              setTodoModalVisible(!ToDoModalVisible);
            }}>
            <Text style={stylesModal.textStyle}>Accept</Text>
          </TouchableHighlight>


          <TouchableHighlight
            style={{ ...stylesModal.openButtonLeft, backgroundColor: '#2196F3' }}
            onPress={() => {
              setTodoModalVisible(!ToDoModalVisible);
            }}>
            <Text style={stylesModal.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>


    { list && (
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderDestinations}
          keyExtractor={(item) => item.id.toString()}
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
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  title: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor: "white",
    fontSize: 24,
    marginBottom: 20
  },
  text: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor: "white",
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  },
  fabLeft: {
    position: 'absolute',
    margin: 20,
    left: 0,
    bottom: 0
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  destinationText: {
    fontSize: 20,
    color: '#333333'
  },
})


const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 75,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  openButtonLeft: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});