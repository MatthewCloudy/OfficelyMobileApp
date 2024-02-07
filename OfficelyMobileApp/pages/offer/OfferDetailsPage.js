import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useStore } from '../../store';
import OfficeStore from '../../API/OfficeStore';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function OfferDetailsPage() {

  const navigation = useNavigation();
  const [offerData, setOfferData] = useState();
  const { officeId } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

      const fetchData = async () => {
          try {
            setIsLoading(true);
              const response = await OfficeStore.getState().fetchOffice(officeId);
              const data = await response.json();

              setOfferData(data);
              setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
          }
      };

      fetchData();
  }, [setOfferData]);

  const handleReserve = () => {
    navigation.navigate("OfficeConfirmation");
  };
  
  if(isLoading)
  {
    return(<Text>Loading...</Text>);
    
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    {offerData ? (
      <View style={styles.container}>
        <Image source={{ uri: offerData.mainPhoto }} style={styles.image} resizeMode='cover' />
        <StarRating
          disabled={true}
          maxStars={5}
          rating={offerData.rating}
          fullStarColor={'#FFD700'}
          starSize={40}
        />
        <Text style={styles.name}>{offerData.name}</Text>
        <Text style={styles.price}>Price: ${offerData.pricePerDay} / day</Text>
        <Text style={styles.address}>Address: {offerData.address}</Text>
        <Text style={styles.description}>{offerData.description}</Text>
        <Button title="Reserve" onPress={handleReserve} />
      </View>
    ) : (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    )}
  </ScrollView>
    
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
    width: 0.85  * windowWidth,
    height: 0.4 * windowHeight,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 20,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 25,
    marginBottom: 10,
  },
  address: {
    fontSize: 25,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default OfferDetailsPage;
