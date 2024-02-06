import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useStore } from './store.js';
import OfficeStore from './API/OfficeStore.js';
import LoginStore from './API/LoginStore.js';

export function OfficeConfirmation() {
    const navigation = useNavigation();
    const [officeDetails, setOfficeDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { officeId, setDefault, maxDistance, availableFrom, availableTo, startDate, endDate } = useStore();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OfficeStore.getState().fetchOffice(officeId);
                const data = await response.json();

                setOfficeDetails(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const handleConfirm = () => {
    //     // TODO
    //     // TODO: Zmienic status office na zarezerwowany API /reservation POST
    //     // TODO

    //     navigation.navigate('ParkingSpots');
    // };

    const reserveOffice = async (userId, officeId, startDateTime, endDateTime, token) => {
        try {
            const url = `https://officely.azurewebsites.net/reservations`;
            const requestBody = [
                {
                    userId: userId,
                    officeId: officeId,
                    startDateTime: startDateTime,
                    endDateTime: endDateTime
                }
            ];
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
    
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleConfirm = () => {

        reserveOffice(0, officeId, startDate, endDate, LoginStore.getState().jwttoken)
            .then(response => {
                // Obsłuż odpowiedź z serwera, jeśli to konieczne
                navigation.navigate('ParkingSpots');
            })
            .catch(error => {

                navigation.navigate('BadPage');
            });
    };
    

    const handleAbort = () => {
        setDefault();
        navigation.navigate('HomePage');
    };
    const formatDateString = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    return (
        <ScrollView style={styles.main}>
            <View>
                <View>
                    <Text style={styles.title}>Office - details</Text>
                </View>
                {loading ? (
                    <Text>Loading...</Text>
                ) : error ? (
                    <Text>Error fetching data</Text>
                ) : (
                <View>
                    <Text style={styles.detailText}>Name: {officeDetails.name}</Text>
                    <Text style={styles.detailText}>Address: {officeDetails.address}</Text>
                    <Text style={styles.detailText}>Description: {officeDetails.description}</Text>
                    <Text style={styles.detailText}>Office Type: {officeDetails.officeType}</Text>
                    <Text style={styles.detailText}>Office Area: {officeDetails.officeArea} m²</Text>
                    <Text style={styles.detailText}>Price Per Day: {officeDetails.pricePerDay} PLN</Text>
                    <Text style={styles.detailText}>Rating: {officeDetails.rating}</Text>
                    <Text style={styles.detailText}>Rent starts: {formatDateString(startDate)}</Text>
                    <Text style={styles.detailText}>Rent ends: {formatDateString(endDate)}</Text>
                  </View>
                )}
            </View>

            <View>
                <View>
                    <Text style={styles.title}>Payment method</Text>
                </View>
                <View style={styles.paymentBox}>
                    <Text>Payment will be done at the first day of rent by cash to owner</Text>
                </View>
                <View style={styles.paymentBox}>
                    <TouchableOpacity style={styles.button} onPress={handleAbort}>
                        <Text style={styles.buttonText}>Abort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Confirm rent</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
main: {
    backgroundColor: '#c5e2fa',
},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
},
detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 20,
  },
});