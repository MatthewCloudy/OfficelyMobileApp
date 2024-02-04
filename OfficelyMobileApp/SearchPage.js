import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Button, Keyboard } from 'react-native';
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import OfficeStore from './API/OfficeStore';
import LoginStore from './API/LoginStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function SearchPage()  {
  const [address, setAddress] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)));
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [offices, setOffices] = useState(OfficeStore.getState().offices);
  useEffect(() => {
    OfficeStore.getState().fetchOffices(10, 0)
      .then(response => response.json())
      .then(data => 
        {
          console.log(data);
          OfficeStore.getState().setOffices(data);
          setOffices(data);
        }
      )
      .catch(error => console.error('Error:', error));
  }, []);

  // Dummy data for offers
  const offers = [
    {
      id: 1,
      image: 'https://www.ceosuite.com/wp-content/uploads/2016/05/lkg-office900.jpg',
      title: 'First Sample Office',
      address: 'Koszykowa 1, Warsaw',
      rating: 5,
      price: '$19.99',
    },
    {
      id: 2,
      image: 'https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg',
      title: 'Second Sample Office',
      address: 'Koszykowa 2, Warsaw',
      rating: 3,
      price: '$17.00',
    },
    {
      id: 3,
      image: 'https://st3.depositphotos.com/12071432/18440/i/450/depositphotos_184405718-stock-photo-working-tables-computers-laptops-business.jpg',
      title: 'Third Sample Office',
      address: 'Koszykowa 3, Warsaw',
      rating: 3,
      price: '$13.50',
    },
    {
      id: 4,
      image: 'https://img.freepik.com/premium-photo/interior-empty-office-with-glass-partitions-loft-style-view-city-park_124507-32995.jpg',
      title: 'Fourth Sample Office',
      address: 'Koszykowa 4, Warsaw',
      rating: 4,
      price: '$34.00',
    },
    {
      id: 5,
      image: 'https://assets-global.website-files.com/5e72120a6f610062d1dae3b5/63b65f840f5cd6eef15b8aad_3A5A9831-min.jpg',
      title: 'Fifth Sample Office',
      address: 'Koszykowa 5, Warsaw',
      rating: 3,
      price: '$27.00',
    },
  ];

  const handleStartDateChange = (event, selectedDate) => {
    setStartDatePickerVisible(false);
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setEndDatePickerVisible(false);
    setEndDate(selectedDate || endDate);
  };

  return (
    <View style={{ flex: 1, padding: 0, marginTop: 25 }}>
      {/* Search Input Fields */}
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        placeholder="Number of seats"
        value={numberOfPeople}
        onChangeText={(text) => setNumberOfPeople(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="First day of reservation"
        value={'from ' + startDate.toDateString()}
        onTouchStart={() => setStartDatePickerVisible(true)}
        onFocus={() => Keyboard.dismiss()}
      />
      {isStartDatePickerVisible && (
        <DateTimePicker
          style={{ width: 200 }}
          value={startDate}
          mode="date"
          placeholder="Select Start Date"
          format="YYYY-MM-DD"
          minDate="2022-01-01"
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onChange={handleStartDateChange}
        />
      )}
      <TextInput
        placeholder="Last day of reservation"
        value={'to ' + endDate.toDateString()}
        onTouchStart={() => setEndDatePickerVisible(true)}
        onFocus={() => Keyboard.dismiss()}
      />
      {isEndDatePickerVisible && (
        <DateTimePicker
          style={{ width: 200 }}
          value={endDate}
          mode="date"
          placeholder="Select End Date"
          format="YYYY-MM-DD"
          minDate="2022-01-01"
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onChange={handleEndDateChange}
      />
      )}
      <Button title='Filter search'/>
      

      {/* ScrollView for listing offers */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {offers.map((offer) => (
          <View key={offer.id} style={styles.container}>
            <TouchableOpacity>
              <Image source={{ uri: offer.image }} style={styles.image} />
              <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={offer.rating}
                  fullStarColor={'#FFD700'}
                  starSize={20}
              />
              <Text style={styles.name}>{offer.title}</Text>
              <Text>{offer.address}</Text>
              <Text>{`Price: ${offer.price} / day`}</Text>
              <TouchableOpacity onPress={() => console.log('Add to favorites pressed')}>
                <Text>Add to Favorites</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            
          </View>
        ))}
      </ScrollView>
      
      
        
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
},
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
},
image: {
  marginTop: 12,
  marginBottom: 8,
  width: windowWidth,
  height: 200,
},
name: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5,
},
});

export default SearchPage;
