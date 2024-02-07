import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Dimensions, Button, Keyboard, FlatList} from 'react-native';
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from 'expo-checkbox';
import { useStore } from '../../store.js';
import Collapsible from 'react-native-collapsible';
import { SelectList } from 'react-native-dropdown-select-list'
import { querryOffices } from '../../API/OfficeStore.js';
import { useNavigation } from '@react-navigation/native';
import SavedStore from '../../API/SavedStore.js';

const windowWidth = Dimensions.get('window').width;

export function SearchPage()  {

  const navigation = useNavigation();

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
   const [offers, setOffers] = useState([]);
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
  const sortsList=[
    "name",
"pricePerDay",
"amenities",
"rating",
"officeArea"
  ]
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
    pageSize,
    pageNum,
    latitude,
    longitude,
    availableFrom,
    maxDistance, setMaxDistance,
    name,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    amenities, setAmenities,
    officeType, setOfficeType,
    minRating, setMinRating,
    minArea, setMinArea,
    sort, setSort,
    sortOrder, setSortOrder,
    startDate, setStartDate,
    endDate, setEndDate,
    setOfficeId,
  } = useStore();

  useEffect(() => {
    setOfficeType("OFFICE");
        querryOffices(pageSize, pageNum, 
          {
          availableFrom: availableFrom.toISOString(),
          availableTo: availableFrom.toISOString(),
          maxDistance: maxDistance,
          name: name,
          minPrice: minPrice,
          maxPrice: maxPrice,
          amenities: amenities,
          officeType: "OFFICE",
          minRating: minRating,
          minArea: minArea,
          sort: sort,
          sortOrder: sortOrder,
          lat: latitude,
          lng: longitude
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No office fetched');
            }
            return response.json();
        })
        .then(data => 
          {
            setOffers(data)
          })
        .catch((error) => console.error('Error:', error));
    
  }, [setOfficeType])
  


  const handleStartDateChange = (event, selectedDate) => {
    setStartDatePickerVisible(false);
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setEndDatePickerVisible(false);
    setEndDate(selectedDate || endDate);
  };

  const handleFilterClick = (event) => {
      querryOffices(pageSize, pageNum, 
        {
          availableFrom: availableFrom.toISOString(),
          availableTo: availableFrom.toISOString(),
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
          lat: latitude,
          lng: longitude})
      .then(response => {
          if (!response.ok) {
              throw new Error('No office fetched');
          }
          return response.json();
      })
      .then(data => 
        {
          setOffers(data)
        })
      .catch((error) => console.error('Error:', error));
  };

  const handleOfficeClick = (id) => {
    setOfficeId(id);
    navigation.navigate("OfferDetailsPage");
  }


  const toggleExpand = () => {
    setCollapsed(!collapsed);
  }


  function toggleItemInArray(array, setFunc, item) {
    const index = array.indexOf(item);
    if (index === -1) {
      setFunc([...array, item]);
    } else {
      setFunc([...array.slice(0, index), ...array.slice(index + 1)]);
    }
  }


  return (
    
    <View style={{ flex: 1, padding: 0, marginTop: 25 }}>

      <TouchableOpacity onPress={toggleExpand}>
        <Text>Expand filters</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Collapsible collapsed={collapsed} renderChildrenCollapsed={true}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text>Sort by:</Text>
      <SelectList 
        setSelected={(val) => setSort(val)} 
        data={sortsList} 
        save="value"
        search={false} />
        <View style={styles.row}>
        <CheckBox disabled={false} value={sortOrder==null} onValueChange={(value) => setSortOrder(sortOrder==null? "DESC" : null)}/>
        <Text>Sort in descending order</Text>
        </View>
        <Text>Office type:</Text>
      <SelectList 
        setSelected={(val) => setOfficeType(val)} 
        data={officeTypeList} 
        save="value"
        defaultOption={{key:'4', value:"OFFICE"}}
        search={false} 
    />
      <Text>Minimum rating:</Text>
      <SelectList 
        setSelected={(val) => setMinRating(val)} 
        data={ratings} 
        save="value"
        defaultOption={{key:'1', value:"1"}}
        search={false} 
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
      <Text>Max distance (km):</Text>
      <TextInput
        value={maxDistance}
        onChangeText={setMaxDistance}
        keyboardType="numeric"
      />
      <Text>Minimum price (PLN/day):</Text>
      <TextInput
        value={minPrice}
        onChangeText={setMinPrice}
        keyboardType="numeric"
      />
      <Text>Maximum price (PLN/day):</Text>
      <TextInput
        value={maxPrice}
        onChangeText={setMaxPrice}
        keyboardType="numeric"
      />
      <Text>Minimum area:</Text>
    <TextInput
        value={minArea}
        onChangeText={setMinArea}
        keyboardType="numeric"
      />
      <Text>Amenities required:</Text>
      {amenitiesList.map((item) => (
        <View style={styles.row}>
        <CheckBox disabled={false} value={amenities.includes(item)} onValueChange={(value) => toggleItemInArray(amenities, setAmenities, item)}/>
        <Text>{item}</Text>
      </View>
      ))}
      
    
      
      <Button title='Filter search' onPress={handleFilterClick}/>
        </ScrollView>
      </Collapsible>
      </ScrollView>
      
      <FlatList
  data={offers}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.scrollContainer}
  renderItem={({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleOfficeClick(item.id)}>
        <Image source={{ 
          uri: item.mainPhoto }} style={styles.image} />
        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.rating}
          fullStarColor={'#FFD700'}
          starSize={20}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{`Price: ${item.pricePerDay} / day`}</Text>
        <TouchableOpacity onPress={() => SavedStore.getState().saveOffice(item.id)}>
          <Text>Add to Favorites / Remove from Favorites</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )}
/>
        
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