import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useState } from 'react';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Parking Spot 1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Parking Spot 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Parking Spot 3',
    },
  ];


export function ParkingSpots() {

    const [spots, setSpots] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleRent = () => {
        // navigate to summary of renting parking spots
    };

    const Item = ({title}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRent}>
            <Text style={styles.buttonText}>Rent</Text>
          </TouchableOpacity>
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
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
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
    elevation: 5, // Dodaj cień dla efektu podniesienia
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
    fontFamily: 'Cochin',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
button: {
    backgroundColor: '#c72b62',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
},
});