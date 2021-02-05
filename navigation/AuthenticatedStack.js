import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../Screens/SettingsScreen';
import HomeStack from './HomeStack';
import { FireBaseContextProvider } from '../context/FireBaseContext';

const Drawer = createDrawerNavigator();

export default function AuthenticatedStack() {
  return (
    <FireBaseContextProvider>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </FireBaseContextProvider>
  );
}
