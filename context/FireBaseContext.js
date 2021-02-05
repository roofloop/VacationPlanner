import React, { createContext } from 'react';
import { auth, dbh } from '../firebase';
import firebase from 'firebase';

export const FireBaseContext = createContext();

export const FireBaseContextProvider = ({ children }) => {
  const userID = auth.currentUser.uid;

  const saveToDb = async (destinationText) => {
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
          .then((_doc) => {})
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

  const updateToDb = async (vacationTodoText, paramText, paramKey) => {
    if (vacationTodoText && vacationTodoText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        destination: paramText,
        todo: vacationTodoText,
        creatorId: userID,
        createdAt: timestamp,
      };
      dbh
        .doc(paramKey)
        .set(data)
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error);
        });
    }
  };

  const deleteFromDb = async (paramKey) => {
    await dbh.doc(paramKey).delete();
  };

  return (
    <FireBaseContext.Provider
      value={{ saveToDb, updateToDb, deleteFromDb, todoSaveDb }}
    >
      {children}
    </FireBaseContext.Provider>
  );
};
