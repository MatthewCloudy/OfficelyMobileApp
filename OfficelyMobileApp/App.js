import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { HomePage } from './HomePage';
import { ParkingSpots } from './ParkingSpots';
import { ParkingConfirmation } from './ParkingConfirmation';
import { OfficeConfirmation } from './OfficeConfirmation';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ReservationsPage } from './pages/reservations/ReservationsPage';
import { SignInPage } from './pages/login/SignInPage';
import { SignUpPage } from './pages/login/SignUpPage.js';
import { SearchPage } from './SearchPage.js';
import { OfferDetailsPage } from './OfferDetailsPage.js';
import { SavedPage } from './pages/saved/SavedPage.js';
import { OkPage } from './OkPage.js';
import { BadPage } from './BadPage.js';

import { Ionicons } from '@expo/vector-icons';
import LoginStore from './API/LoginStore.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="ParkingSpots" component={ParkingSpots} />
    <Stack.Screen name="ParkingConfirmation" component={ParkingConfirmation} />
    <Stack.Screen name="OfficeConfirmation" component={OfficeConfirmation} />
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
    <Stack.Screen name="ReservationsPage" component={ReservationsPage} />
    <Stack.Screen name="SavedOfficesPage" component={SavedPage} />
    <Stack.Screen name="SearchPage" component={SearchPage} />
    <Stack.Screen name="OfferDetailsPage" component={OfferDetailsPage} />
    <Stack.Screen name="SignInPage" component={SignInPage} />
    <Stack.Screen name="SignUpPage" component={SignUpPage} />
    <Stack.Screen name="OkPage" component={OkPage} />
    <Stack.Screen name="BadPage" component={BadPage} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Home"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
  </Stack.Navigator>
);

const ReservationStack = () => (
  <Stack.Navigator initialRouteName="SignInPage"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ReservationsPage" component={ReservationsPage} />
  </Stack.Navigator>
);

const SavedStack = () => (
  <Stack.Navigator initialRouteName="SignInPage"
    screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SavedOfficesPage" component={SavedPage} />
  </Stack.Navigator>
);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    LoginStore.subscribe(() => {
      setLoggedIn(LoginStore.getState().jwttoken !== "");
    })
  },[])
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused || !loggedIn ? 'home' : 'home-outline';
            } else if (route.name === 'My reservations') {
              iconName = focused && loggedIn ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Saved for later') {
              iconName = focused && loggedIn ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Profile') {
              iconName = focused && loggedIn? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'gray', // Kolor ikony dla aktywnego ekranu
          tabBarInactiveTintColor: 'gray', // Kolor ikony dla nieaktywnego ekranu
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          headerShown: false
        })}

      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Saved for later" component={loggedIn ? SavedStack : HomeStack}/>
        <Tab.Screen name="My reservations" component={loggedIn ? ReservationStack : HomeStack}/> 
        <Tab.Screen name="Profile" component={loggedIn ? ProfileStack : HomeStack} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
