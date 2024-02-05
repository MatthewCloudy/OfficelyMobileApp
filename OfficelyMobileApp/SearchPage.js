import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Button, Keyboard} from 'react-native';
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';
import { useStore } from './store.js';
import Collapsible from 'react-native-collapsible';
import MapView, { Marker } from 'react-native-maps';
import { SelectList } from 'react-native-dropdown-select-list'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SearchPage = () => {
  const [address, setAddress] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [offers, setOffers] = useState([
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
  ]);
  const [collapsed, setCollapsed] = useState(true);
  const amenitiesList = [
    "WIFI",
    "COFFEE",
    "TEA",
    "PROJECTOR",
    "WHITEBOARD",
    "PRINTER",
    "SCANNER",
    "FAX",
    "PHONE",
    "KITCHEN",
    "PARKING",
    "ACCESSIBLE",
    "SECURITY",
    "LOCKERS",
    "PETS_ALLOWED",
    "SMOKING_AREA"
  ];
  const officeTypeList = [
    {key:'1', value:"CONFERENCE_ROOM"},
    {key:'2', value:"COWORKING_SPACE"},
    {key:'3', value:"DESK"},
    {key:'4', value:"OFFICE"},
  ]
  const ratings = [
    {key:'1', value:'1'},
    {key:'2', value:'2'},
    {key:'3', value:'3'},
    {key:'4', value:'4'},
    {key:'5', value:'5'},
  ]

  const {
    pageSize, setPageSize,
    pageNum, setPageNum,
    latitude, setLatitude,
    longitude, setLongitude,
    availableFrom, setAvailableFrom,
    availableTo, setAvailableTo,
    maxDistance, setMaxDistance,
    name, setName,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    amenities, setAmenities,
    officeType, setOfficeType,
    minRating, setMinRating,
    minArea, setMinArea,
    sort, setSort,
    sortOrder, setSortOrder,
    startDate, setStartDate,
    endDate, setEndDate
  } = useStore();

  useEffect(() => {
    // Pobieranie ofert z API - przykład użycia fetch()
    const fetchData = async () => {
      try {
        const response = await fetch('https://officely.azurewebsites.net/offices', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `,
          },
          body: JSON.stringify({
            pageSize: pageSize,
            pageNum: pageNum,
            location: latitude,
            availableFrom: availableFrom,
            availableTo: availableTo,
            maxDistance: maxDistance,
            name: name,
            minPrice: minPrice,
            maxPrice: maxPrice,
            amenities: amenities,
            officeType: officeType,
            minRating: minRating,
            minArea: minArea,
            sort: sort,
            sortOrder: sortOrder,

          }),
        });
        const data = await response.json();

        if(response.status === 401)
        {
          console.log("401");
        }

        setOffers(data);



      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    //fetchData();
  }, []); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po pierwszym renderowaniu komponentu
  


  const handleStartDateChange = (event, selectedDate) => {
    setStartDatePickerVisible(false);
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setEndDatePickerVisible(false);
    setEndDate(selectedDate || endDate);
  };

  const handleFilterClick = (event, selectedDate) => {
    // fetch po zaktualizowane dane
    // setOffers() ustawiamy na to co przyszlo
  };

  const toggleExpand = () => {
    setCollapsed(!collapsed);
  }

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);
    
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  function toggleItemInArray(array, setFunc, item) {
    const index = array.indexOf(item);
    if (index === -1) {
      // If the item is not in the array, add it
      console.log("toggled item addition");
      setFunc([...array, item]);
    } else {
      // If the item is in the array, remove it
      console.log("toggled item removal");
      setFunc([...array.slice(0, index), ...array.slice(index + 1)]);
    }
  }


  return (
    
    
    <View style={{ flex: 1, padding: 0, marginTop: 25 }}>
      {/* Search Input Fields */}

      <TouchableOpacity onPress={toggleExpand}>
        <Text>Expand filters</Text>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <ScrollView>
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
      <TextInput
        placeholder="Max distance (km)"
        value={maxDistance}
        onChangeText={setMaxDistance}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Minimum price (PLN/day)"
        value={minPrice}
        onChangeText={setMinPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Maximum price (PLN/day)"
        value={maxPrice}
        onChangeText={setMaxPrice}
        keyboardType="numeric"
      />
      <Text>Amenities required:</Text>
      {amenitiesList.map((item) => (
        <View style={styles.row}>
        <CheckBox disabled={false} value={amenities.includes(item)} onValueChange={(value) => toggleItemInArray(amenities, setAmenities, item)}/>
        <Text>{item}</Text>
      </View>
      ))}
      <Text>Office type:</Text>
      <SelectList 
        setSelected={(val) => setOfficeType(val)} 
        data={officeTypeList} 
        save="value"
    />
      <Text>Minimum rating:</Text>
      <SelectList 
        setSelected={(val) => setMinRating(val)} 
        data={ratings} 
        save="value"
    />
    <Text>Minimum area:</Text>
    <TextInput
        placeholder="Minimum area (m^2)"
        value={minArea}
        onChangeText={setMinArea}
        keyboardType="numeric"
      />
      <Button title='Filter search'/>
        </ScrollView>
      
      </Collapsible>

      
      

      {/* ScrollView for listing offers */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {offers.map((offer) => (
          <View key={offer.id} style={styles.container}>
            <TouchableOpacity onPress={() => console.log('office pressed')}>
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
row: {
  flexDirection: 'row',
}
});

export default SearchPage;
