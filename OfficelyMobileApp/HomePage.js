import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useStore } from './store.js';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const image = require('./assets/officePicture.jpg');

export function HomePage() {

    const navigation = useNavigation();
    const {
        pageSize, setPageSize,
        pageNum, setPageNum,
        latitude, setLatitude,
        longitude, setLongitude,
        availableFrom, setAvailableFrom,
        availableTo, setAvailableTo,
        maxDistance, setMaxDistance,
        name, setName,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        amenities, setAmenities,
        officeType, setOfficeType,
        minRating, setMinRating,
        minArea, setMinArea,
        sort, setSort,
        sortOrder, setSortOrder,
      } = useStore();

    const handleSignIn = () => {
        navigation.navigate('SignInPage');
    };
    const handleSignUp = () => {
        navigation.navigate('SignUpPage');
    };
    const handleSubmit = () => {
        navigation.navigate('OfficeConfirmation');
    };

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 52.2297, // Warszawa, szerokość geograficzna
        longitude: 21.0122, // Warszawa, długość geograficzna
      });
    
      const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
        
        setSelectedLocation({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });
      };


    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ScrollView >
            <View >
            <View>
                <Text style={styles.title}>Officely</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <View style={{ marginRight: 30 }} />
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} value={maxDistance} keyboardType="numeric" placeholder="Proximity [km]" onChangeText={(e) => setMaxDistance(e.target)}/>
                <TextInput style={styles.input} value={minArea} keyboardType="numeric" placeholder="Area [m²]" onChangeText={(e) => setMinArea(e.target)}/>
                <TextInput style={styles.input} value={maxPrice} keyboardType="numeric" placeholder="Max price [PLN]" onChangeText={(e) => setMaxPrice(e.target)}/>
                <View style={{ flex: 1,  height:300, width: 300}}>
                    <MapView
                        style={{ flex: 1}}
                        initialRegion={{
                        latitude: 52.2297, // Warszawa, szerokość geograficzna
                        longitude: 21.0122, // Warszawa, długość geograficzna
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                        onPress={handleMapPress}
                    >
                        <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        />
                    </MapView>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
            </ScrollView>


        </ImageBackground>
        
        
    );
  }

const styles = StyleSheet.create({
main: {
    backgroundColor: '#F8F4EC',
},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
},
image: {
    flex: 1,
    justifyContent: 'center',
  },
input: {
    width: '80%',
    height: 50,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#333',
    margin: 12,
  },
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
},
button: {
    backgroundColor: '#272829',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#272829',
    textAlign: 'center',
    marginBottom: 20,
  },
});