import * as React from 'react';

import Home from '../Screens/Home';
import { createStackNavigator } from '@react-navigation/stack';

import NewVacationScreen from '../Screens/NewVacationScreen';
import EditVacationScreen from '../Screens/EditVacationScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
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
  );
}
