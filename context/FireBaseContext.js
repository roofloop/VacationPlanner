import React, { createContext } from "react";
import { auth, dbh } from "../firebase";
import firebase from "firebase";


export const FireBaseContext = createContext();

export const FireBaseContextProvider = ({ children }) => {

  const userID = auth.currentUser.uid

  const saveToDb = async (destinationText, vacationTodoText) => {

    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        destination: destinationText,
        todo: vacationTodoText,
        creatorId: userID,
        createdAt: timestamp
      };
      await dbh
        .add(data)
        .then(_doc => {
        })
        .catch((error) => {
          alert(error)
        });
    }
    catch (error) {
      console.log(error);
    }
  };


  const updateToDb = async (vacationTodoText, paramText, paramKey) => {
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const data = {
        destination: paramText,
        todo: vacationTodoText,
        creatorId: userID,
        createdAt: timestamp,
      };
      await dbh.doc(paramKey)
        .set(data)
        .catch((error) => {
          alert(error)
        });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromDb = async (paramKey) => {
    await dbh.doc(paramKey).delete();
  }

  return (
    <FireBaseContext.Provider value={{ saveToDb, updateToDb, deleteFromDb }}>
      {children}
    </FireBaseContext.Provider>
  );
};
