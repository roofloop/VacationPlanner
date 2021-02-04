import React from 'react';
import Home from '../Screens/Home';
import SettingsScreen from '../Screens/SettingsScreen';
import NewVacationScreen from '../Screens/NewVacationScreen';
import EditVacationScreen from '../Screens/EditVacationScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { FireBaseContextProvider } from '../context/FireBaseContext';

const Stack = createStackNavigator();

export default function AuthenticatedStack() {
  return (
    <FireBaseContextProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen
          name="NewVacationScreen"
          component={NewVacationScreen}
          options={{ title: 'New vacation' }}
        />
        <Stack.Screen
          name="EditVacationScreen"
          component={EditVacationScreen}
          options={{ title: 'Edit or delete vacation' }}
        />
      </Stack.Navigator>
    </FireBaseContextProvider>
  );
}
