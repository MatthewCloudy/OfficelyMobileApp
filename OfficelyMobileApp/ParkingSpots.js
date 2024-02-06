import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useStore } from './store';
import {getCityAndCountry, getParkings, getParklyToken} from './ParkingSpots.hooks.js';

const DATA = [
  {
    id: 1,
    iso3166Country: 'PL',
    cityName: 'Warsaw',
    postalCode: '00-001',
    streetName: 'Aleje Jerozolimskie',
    buildingNumber: '123',
    longitude: 21.01178,
    latitude: 52.22977,
    dailyCost: 10,
    distanceKm: 1.5,
  },
  {
    id: 2,
    iso3166Country: 'PL',
    cityName: 'Krakow',
    postalCode: '30-001',
    streetName: 'Rynek Glowny',
    buildingNumber: '456',
    longitude: 19.93661,
    latitude: 50.06143,
    dailyCost: 12,
    distanceKm: 2.3,
  },
  {
    id: 3,
    iso3166Country: 'PL',
    cityName: 'Gdansk',
    postalCode: '80-001',
    streetName: 'Dlugi Targ',
    buildingNumber: '789',
    longitude: 18.64664,
    latitude: 54.35205,
    dailyCost: 8,
    distanceKm: 3.1,
  },
  {
    id: 4,
    iso3166Country: 'PL',
    cityName: 'Wroclaw',
    postalCode: '50-001',
    streetName: 'Rynek',
    buildingNumber: '1011',
    longitude: 17.03267,
    latitude: 51.10998,
    dailyCost: 15,
    distanceKm: 4.5,
  },
  {
    id: 5,
    iso3166Country: 'PL',
    cityName: 'Poznan',
    postalCode: '60-001',
    streetName: 'Stary Rynek',
    buildingNumber: '1213',
    longitude: 16.93785,
    latitude: 52.40867,
    dailyCost: 11,
    distanceKm: 2.7,
  },
  {
    id: 6,
    iso3166Country: 'PL',
    cityName: 'Lodz',
    postalCode: '90-001',
    streetName: 'Piotrkowska',
    buildingNumber: '1415',
    longitude: 19.45415,
    latitude: 51.76873,
    dailyCost: 9,
    distanceKm: 1.8,
  },
];

export function ParkingSpots() {

    const {
      setParkingId,
      setParkingIso3166Country,
      setParkingCityName,
      setParkingPostalCode,
      setParkingStreetName,
      setParkingBuildingNumber,
      setParkingLongitude,
      setParkingLatitude,
      setParkingDailyCost,
      setParkingDistanceKm,
      latitude,
      longitude,
      cityName,
      countryCode,
      setCityName,
      setCountryCode,
      parkingToken,
      setParkingToken,
      availableTo,
      availableFrom,
    } = useStore();

    const [spots, setSpots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const handleRent = (parking) => {
        setParkingId(parking.id);
        setParkingIso3166Country(parking.iso3166Country);
        setParkingCityName(parking.cityName);
        setParkingPostalCode(parking.postalCode);
        setParkingStreetName(parking.streetName);
        setParkingBuildingNumber(parking.buildingNumber);
        setParkingLongitude(parking.longitude);
        setParkingLatitude(parking.latitude);
        setParkingDailyCost(parking.dailyCost);
        setParkingDistanceKm(parking.distanceKm);
        navigation.navigate('ParkingConfirmation');
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const geoData = await getCityAndCountry(latitude, longitude);
          setCityName(geoData.cityName);
          setCountryCode(geoData.countryCode);
    
          const token = await getParklyToken();
          console.log(token);
          setParkingToken(token);

          const response = await getParkings(countryCode,cityName,availableFrom,availableTo,latitude,longitude,token);
          console.log(response);

          const parks = await response.json();
          setSpots(parks.content);

          setIsLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, []);

    const handleAbort = () => {
      navigation.navigate('ProfilePage');
  };
    const Item = ({ parking }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerFirst}>
          <Text style={styles.itemTitle}>{parking.cityName}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleRent(parking)}>
            <Text style={styles.buttonText}>Rent</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.itemDetails}>
            {parking.streetName} {parking.buildingNumber}, {parking.postalCode}
          </Text>
          <Text style={styles.itemDetails}>
            Daily Cost: {parking.dailyCost}
          </Text>
        </View>

      </View>
    );

    if(isLoading)
    {
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    }
    else
    {
      return(
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Available parking spots nearby your office</Text>  
          <TouchableOpacity style={styles.button} onPress={handleAbort}>
              <Text style={styles.buttonText}>No thanks, I'm done</Text>
          </TouchableOpacity>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item parking={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
      );
    }

  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
},
itemContainer: {
  backgroundColor: '#B4D4FF',
  borderRadius: 10,
  overflow: 'hidden',
  marginHorizontal: 20,
  marginBottom: 20,
  elevation: 5,

},
itemContainerFirst: {

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
item: {
    backgroundColor: '#f9c2ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
},
itemTitle: {
    fontSize: 32,
    margin: 20,
},
title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
button: {
  
    backgroundColor: '#272829',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 15,
  textAlign: 'center',
},
itemDetails: {
  fontSize: 16,
  marginHorizontal: 20,
  marginBottom: 10,
  color: '#555',
},
});