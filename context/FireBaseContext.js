import React, { createContext } from 'react';
import { auth, dbh } from '../firebase';
import firebase from 'firebase';

export const FireBaseContext = createContext();

//Context for handling CRUD-functionality.

export const FireBaseContextProvider = ({ children }) => {
  const userID = auth.currentUser.uid;

  //Save destination to firestore and add metadata to be used for sorting
  const saveDestinationToDb = async (destinationText) => {
    try {
      if (destinationText && destinationText.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          destination: destinationText,
          creatorId: userID,
          createdAt: timestamp,
        };
        await dbh
          .add(data)
          .then((_doc) => { })
          .catch((error) => {
            alert(error);
          });
      } else {
        // eslint-disable-next-line no-alert
        alert('Textfields must not be empty!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Save destination to firestore and add metadata used for sorting
  const todoSaveDb = async (vacationTodoText, paramKey) => {
    try {
      if (vacationTodoText && vacationTodoText.length > 0) {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          todo: vacationTodoText,
          creatorId: userID,
          createdAt: timestamp,
        };
        await dbh
          .doc(paramKey)
          .collection('todos')
          .add(data)
          .catch((error) => {
            // eslint-disable-next-line no-alert
            alert(error);
          });
      } else {
        // eslint-disable-next-line no-alert
        alert('Textfields must not be empty!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoFromDb = async (paramKey, todoKey) => {
    await dbh.doc(paramKey).collection('todos').doc(todoKey).delete();
  };
  const deleteVacation = async (key) => {
    await dbh.doc(key).delete();
  };

  return (
    <FireBaseContext.Provider
      value={{
        saveDestinationToDb,
        deleteTodoFromDb,
        todoSaveDb,
        deleteVacation,
      }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};
