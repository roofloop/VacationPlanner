import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FloatingButton from '../Styles/FloatingButton';



export default function Home({ navigation }) {

  const NewVacationScreen = () => {
    console.log("Creating User")
    navigation.navigate("NewVacationScreen")
}

  return (

    <View style={styles.container}>
      <Text>
        I'm just a Text
        </Text>

      <FloatingButton
        style={styles.floatinBtn}
        onPress={NewVacationScreen}
         />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatinBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});