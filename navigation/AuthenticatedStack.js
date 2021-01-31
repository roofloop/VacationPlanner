import React from 'react';
import Home from '../Screens/Home';
import SettingsScreen from '../Screens/SettingsScreen';
import NewVacationScreen from '../Screens/NewVacationScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="NewVacationScreen" component={NewVacationScreen} />
    </Stack.Navigator>
  );
}