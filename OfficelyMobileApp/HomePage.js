import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useState } from 'react';

const image = require('./assets/officePicture.jpg');

export function HomePage() {

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [proximity, setProximity] = useState();
    const [area, setArea] = useState();

    const handleSignIn = () => {
        // navigate do rejestracji
    };
    const handleSignUp = () => {
        // navigate do logowania
    };
    const handleSubmit = () => {
        // get po wyniki i navigate do listy ofert
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
                <TextInput style={styles.input} value={name} placeholder="Name" onChangeText={(e) => setName(e.target)}/>
                <TextInput style={styles.input} value={location} placeholder="Location" onChangeText={(e) => setLocation(e.target)}/>
                <TextInput style={styles.input} value={proximity} placeholder="Proximity [km]" onChangeText={(e) => setProximity(e.target)}/>
                <TextInput style={styles.input} value={area} placeholder="Area [m²]" onChangeText={(e) => setArea(e.target)}/>
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
    backgroundColor: '#494d52',
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
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});