import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { APIClient } from './API/APIClient';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage } from './HomePage';
import { ParkingSpots } from './ParkingSpots';
import { ParkingConfirmation } from './ParkingConfirmation';
import { OfficeConfirmation } from './OfficeConfirmation';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ReservationsPage } from './pages/reservations/ReservationsPage';
import { SavedOfficesPage } from './SavedOfficesPage';
import { SignInPage } from './pages/login/SignInPage';
import { SignUpPage } from './pages/login/SignUpPage.js';
import { SearchPage } from './SearchPage.js';
import { OfferDetailsPage } from './OfferDetailsPage.js'
import LoginStore from './API/LoginStore.js';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


export default function App() {

  useEffect(() => {
    AsyncStorage.getItem('jwttoken').then((jwt) => {
      if (jwt) {
        AsyncStorage.getItem('user').then((userData) => {
          if (userData) {
            LoginStore.getState().updateData({user: JSON.parse(userData), jwttoken: jwt});
          }
        })
      }
    })
  }, []);

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
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="OfferDetailsPage" component={OfferDetailsPage} />
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
