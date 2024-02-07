import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const image = require('./assets/officePicture.jpg');

export function BadPage() {
    const navigation = useNavigation();
    const handleOk = () => {
      navigation.navigate("HomePage");
    }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Something went wrong!</Text>
            <TouchableOpacity style={styles.button} onPress={handleOk}>
              <Text style={styles.buttonText}>Ok {':('}</Text>
            </TouchableOpacity>
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
