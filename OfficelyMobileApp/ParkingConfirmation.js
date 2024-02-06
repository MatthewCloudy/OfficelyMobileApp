import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useStore } from './store.js';
import OfficeStore from './API/OfficeStore.js';

export function ParkingConfirmation() {
    const navigation = useNavigation();
    const [officeDetails, setOfficeDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { officeId, setDefault, maxDistance } = useStore();

    const {
        parkingId,
        parkingIso3166Country,
        parkingCityName,
        parkingPostalCode,
        parkingStreetName,
        parkingBuildingNumber,
        availableFrom,
        availableTo,
        parkingLongitude,
        parkingLatitude,
        parkingDailyCost,
        parkingDistanceKm,
      } = useStore();

    const handleConfirm = () => {
        // TODO: Zmienic status parking na zarezerwowany API PARKLY POST /user/reservation 
        navigation.navigate('HomePage');
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
                    <Text style={styles.title}>Parking - details</Text>
                </View>
                <View>
                    <Text style={styles.detailText}>Country: {parkingIso3166Country}</Text>
                    <Text style={styles.detailText}>City: {parkingCityName}</Text>
                    <Text style={styles.detailText}>Street: {parkingStreetName}{' '}{parkingBuildingNumber}</Text>
                    <Text style={styles.detailText}>Postal Code: {parkingPostalCode}</Text>
                    <Text style={styles.detailText}>Office Area: {officeDetails.officeArea} m²</Text>
                    <Text style={styles.detailText}>Price Per Day: {parkingDailyCost} PLN</Text>
                    <Text style={styles.detailText}>Rent starts: {formatDateString(availableFrom)}</Text>
                    <Text style={styles.detailText}>Rent ends: {formatDateString(availableTo)}</Text>
                </View>
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






















// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import { useState } from 'react';


// export function ParkingConfirmation() {

//     const handlePayment = () => {
//         // navigate to payment
//     };


//     return (
//         <ScrollView style={styles.main}>
//             <View>
//                 <View>
//                     <Text style={styles.title}>Parking spot - details</Text>
//                 </View>
//                 <View>
//                     <Text>Detail 1</Text>
//                     <Text>Detail 2</Text>
//                     <Text>Detail 3</Text>
//                 </View>
//             </View>
            

//             <View>
//                 <View>
//                     <Text style={styles.title}>Payment method</Text>
//                 </View>
//                 <View style={styles.paymentBox}>
//                     <TouchableOpacity style={styles.button} onPress={handlePayment}>
//                         <Text style={styles.buttonText}>Method 1</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={handlePayment}>
//                         <Text style={styles.buttonText}>Method 2</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={handlePayment}>
//                         <Text style={styles.buttonText}>Method 3</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
            
//         </ScrollView>
        
//     );
//   }

// const styles = StyleSheet.create({
// main: {
//     backgroundColor: '#AED2FF',
// },
// container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
// },
// paymentBox: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 10,
// },
// input: {
//     width: '80%',
//     height: 50,
//     fontSize: 18,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     color: '#333',
//     margin: 12,
//   },
// buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '100%',
//     marginBottom: 20,
// },
// button: {
//     backgroundColor: '#494d52',
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
// buttonText: {
//     color: '#fff',
//     fontSize: 15,
//     textAlign: 'center',
//   },
// title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'left',
//     marginBottom: 20,
//   },
// });