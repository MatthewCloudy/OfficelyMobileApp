import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage } from './HomePage';
import { ParkingSpots } from './ParkingSpots';
import { ParkingConfirmation } from './ParkingConfirmation';
import { OfficeConfirmation } from './OfficeConfirmation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ParkingSpots" component={ParkingSpots} />
        <Stack.Screen name="ParkingConfirmation" component={ParkingConfirmation} />
        <Stack.Screen name="OfficeConfirmation" component={OfficeConfirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
