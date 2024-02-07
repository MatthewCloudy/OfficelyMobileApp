import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginStore from '../../API/LoginStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const image = require('../../assets/officePicture.jpg');

export function SignInPage() {

    const navigation = useNavigation();
    const handleSubmit = () => {
        LoginStore.getState().login(username, password)
        .then(() => {
            navigation.navigate('HomePage');
        })
        .catch((error) => {
            console.error('Error:', error);
        });  
    };

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <KeyboardAwareScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View >
                    <View >
                        <View>
                            <Text style={styles.title}>Sign In</Text>
                        </View>
                        
                        <View style={styles.container}>
                            <TextInput style={styles.input} 
                            value={username} 
                            placeholder="Username" 
                            onChangeText={text => setUsername(text)}/>
                            <TextInput 
                            style={styles.input}
                            value={password}  
                            placeholder="Password" 
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            />

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.view}>

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
view: {
    marginBottom: 340,
},
});