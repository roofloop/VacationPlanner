import React, { useContext } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';




export default function Home() {

  const { signOut } = useContext(AuthContext);


  const submit = () => {
    signOut();

  };


  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();


  return (


    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button style={styles.button} title="Sign Out" onPress={submit} />


      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>

    </View>

    


  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    marginTop: 100,
  }
});
