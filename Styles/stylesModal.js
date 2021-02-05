import { StyleSheet } from 'react-native';

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
    backgroundColor: 'cyan',
    padding: 10,
    elevation: 2,
    right: 0,
    bottom: 0,
  },
  openButtonLeft: {
    backgroundColor: '#F194FF',
    padding: 10,
    elevation: 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export { stylesModal };
