import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA85uPJzMPE56eNciydAJZZlJmZrJDEEsk",
  authDomain: "reactnativejs-826d7.firebaseapp.com",
  projectId: "reactnativejs-826d7",
  storageBucket: "reactnativejs-826d7.appspot.com",
  messagingSenderId: "295773053733",
  appId: "1:295773053733:web:d902ad536255ca6573b0cc",
  measurementId: "G-JK5KZQFRPB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const dbh = firebase.firestore().collection('destinations')

export { firebase };


