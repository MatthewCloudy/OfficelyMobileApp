import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const image = require('./assets/officePicture.jpg');

export function SignUpPage() {

    const navigation = useNavigation();
    const handleSubmit = () => {
        // POST dla utworzenia uzytkownika, GET po token, w przypadku istniejacego uzytkownika wyswietlic informacje pod danymi
        navigation.navigate('Home');
    };

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ScrollView >
                <View >
                    <View>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>
                    
                    <View style={styles.container}>
                        <TextInput style={styles.input} value={username} placeholder="Username" onChangeText={(e) => setUsername(e.target)}/>
                        <TextInput
                        style={styles.input} 
                        value={password} 
                        placeholder="Password" 
                        onChangeText={(e) => setPassword(e.target)}
                        secureTextEntry={true}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign up</Text>
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