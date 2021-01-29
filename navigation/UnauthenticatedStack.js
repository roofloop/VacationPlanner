import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../Screens/LogIn';
import CreateUser from '../Screens/CreateUser';


const Stack = createStackNavigator();

export default function UnauthenticatedStack() {
  return (
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
      </Stack.Navigator>
  );
}