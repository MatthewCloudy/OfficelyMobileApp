import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { APIClient } from './API/APIClient';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage } from './HomePage';
import { ParkingSpots } from './ParkingSpots';
import { ParkingConfirmation } from './ParkingConfirmation';
import { OfficeConfirmation } from './OfficeConfirmation';
import { ProfilePage } from './ProfilePage';
import { ReservationsPage } from './ReservationsPage';
import { SavedOfficesPage } from './SavedOfficesPage';

const Stack = createStackNavigator();


export default function App() {

  let apiClient = new APIClient();
  apiClient.login('admin', 'admin').then(() => {
    console.log('Login successful');
    apiClient.logout().then(() => {
      console.log('Logout successful');
    })
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="ParkingSpots" component={ParkingSpots} />
        <Stack.Screen name="ParkingConfirmation" component={ParkingConfirmation} />
        <Stack.Screen name="OfficeConfirmation" component={OfficeConfirmation} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ReservationsPage" component={ReservationsPage} />
        <Stack.Screen name="SavedOfficesPage" component={SavedOfficesPage} />
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
