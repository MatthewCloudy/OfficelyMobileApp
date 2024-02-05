import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

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
import { OfferDetailsPage } from './OfferDetailsPage.js';
import LoginStore from './API/LoginStore.js';

import { Ionicons } from '@expo/vector-icons'; // Importuj ikony z Expo

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="ParkingSpots" component={ParkingSpots} />
    <Stack.Screen name="ParkingConfirmation" component={ParkingConfirmation} />
    <Stack.Screen name="OfficeConfirmation" component={OfficeConfirmation} />
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
    <Stack.Screen name="ReservationsPage" component={ReservationsPage} />
    <Stack.Screen name="SavedOfficesPage" component={SavedOfficesPage} />
    <Stack.Screen name="SearchPage" component={SearchPage} />
    <Stack.Screen name="OfferDetailsPage" component={OfferDetailsPage} />
    <Stack.Screen name="SignInPage" component={SignInPage} />
    <Stack.Screen name="SignUpPage" component={SignUpPage} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
    <Stack.Screen name="SavedOfficesPage" component={SavedOfficesPage} />
  </Stack.Navigator>
);

const ReservationStack = () => (
  <Stack.Navigator initialRouteName="SignInPage">
    <Stack.Screen name="ReservationsPage" component={ReservationsPage} />
  </Stack.Navigator>
);

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem('jwttoken').then((jwt) => {
      if (jwt) {
        AsyncStorage.getItem('user').then((userData) => {
          if (userData) {
            LoginStore.getState().updateData({ user: JSON.parse(userData), jwttoken: jwt });
          }
        });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'My reservations') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'gray', // Kolor ikony dla aktywnego ekranu
          inactiveTintColor: 'gray', // Kolor ikony dla nieaktywnego ekranu
        }}
        
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="My reservations" component={ReservationStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
