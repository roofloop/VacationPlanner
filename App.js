import React from 'react';
import AuthContextProvider from './context/AuthContext';
import FireBaseContextProvider from './context/FireBaseContext';
import AuthNavigation from './navigation/AuthNavigation';

export default function App() {
  return (

    <AuthContextProvider>
        <AuthNavigation />
    </AuthContextProvider>


  );
}
