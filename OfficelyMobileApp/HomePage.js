import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useStore } from './store';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker } from 'react-native-maps';
import LoginStore from './API/LoginStore';

const image = require('./assets/officePicture.jpg');

export function HomePage() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const {
    setLatitude,
    setLongitude,
    maxDistance,
    setMaxDistance,
    maxPrice,
    setMaxPrice,
    minArea,
    setMinArea,
  } = useStore();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 52.2297,
    longitude: 21.0122,
  });

  const [searchText, setSearchText] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleSignIn = () => {
    navigation.navigate('SignInPage');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  const handleSubmit = () => {
    navigation.navigate('SearchPage');
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleSuggestionPress = (location) => {
    setLatitude(location.coordinates.latitude);
    setLongitude(location.coordinates.longitude);
    setSelectedLocation({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      });
    setSearchText('');
    setSuggestedLocations([]);
    setMapRegion({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  };

  const fetchSuggestions = async () => {
    const apiKey = 'AIzaSyCu4u7lfHE-XWI8Bh1AOeLn0SoUw_kRXOU';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const locations = await Promise.all(
          data.predictions.map(async (prediction) => {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${apiKey}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
  
            if (detailsData.status === 'OK') {
              const placeDetails = detailsData.result;
              return {
                placeId: prediction.place_id,
                description: prediction.description,
                coordinates: {
                  latitude: placeDetails.geometry.location.lat,
                  longitude: placeDetails.geometry.location.lng,
                },
              };
            } else {
              return null;
            }
          })
        );
  
        const filteredLocations = locations.filter((location) => location !== null);
  
        setSuggestedLocations(filteredLocations);
      } else {
        setSuggestedLocations([]);
      }
    } catch (error) {
      setSuggestedLocations([]);
    }
  };
  

  useEffect(() => {
    fetchSuggestions();
    LoginStore.subscribe(() => {
      setLoggedIn(LoginStore.getState().jwttoken !== null);
    });
  }, [searchText]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <View>
            <Text style={styles.title}>Officely</Text>
          </View>
          {!loggedIn && 
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <View style={{ marginRight: 30 }} />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>}
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={maxDistance.toString()}
              keyboardType="numeric"
              placeholder="Proximity [km]"
              onChangeText={(text) => setMaxDistance(text)}
            />
            <TextInput
              style={styles.input}
              value={minArea.toString()}
              keyboardType="numeric"
              placeholder="Area [m²]"
              onChangeText={(text) => setMinArea(text)}
            />
            <TextInput
              style={styles.input}
              value={maxPrice.toString()}
              keyboardType="numeric"
              placeholder="Max price [PLN]"
              onChangeText={(text) => setMaxPrice(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Search location"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            {suggestedLocations.map((location) => (
              <TouchableOpacity
                key={location.placeId}
                style={styles.suggestion}
                onPress={() => handleSuggestionPress(location)}
              >
                <Text>{location.description}</Text>
              </TouchableOpacity>
            ))}
            <View style={{ flex: 1, height: 300, width: 300 }}>
              <MapView
                style={{ flex: 1 }}
                region={mapRegion}
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
      </ImageBackground>
    </KeyboardAwareScrollView>
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
  suggestion: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
