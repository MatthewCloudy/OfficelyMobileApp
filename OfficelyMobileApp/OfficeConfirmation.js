import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';


export function OfficeConfirmation() {

    const handlePayment = () => {
        // navigate to payment
    };


    return (
        <View style={styles.main}>
            <View>
                <View>
                    <Text style={styles.title}>Office - details</Text>
                </View>
                <View>
                    <Text>Detail 1</Text>
                    <Text>Detail 2</Text>
                    <Text>Detail 3</Text>
                </View>
            </View>
            

            <View>
                <View>
                    <Text style={styles.title}>Payment method</Text>
                </View>
                <View style={styles.paymentBox}>
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Method 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Method 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Method 3</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
        
    );
  }

const styles = StyleSheet.create({
main: {
    backgroundColor: '#AED2FF',
},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
},
paymentBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
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
    fontFamily: 'Cochin',
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
title: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
});