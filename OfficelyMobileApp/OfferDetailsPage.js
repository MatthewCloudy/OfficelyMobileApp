import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';

const officeDescription = `
Welcome to our dynamic and collaborative office space, where innovation meets productivity in a modern and inviting environment. Nestled in the heart of Warsaw, our office is designed to inspire creativity and foster teamwork.

As you step into our well-appointed reception area, you'll immediately sense the professional and vibrant atmosphere that defines our workplace. Natural light floods through large windows, creating an energizing ambiance throughout the day. Our open-concept layout promotes seamless communication and encourages spontaneous interactions among team members.

Equipped with state-of-the-art facilities, our office provides a range of workspaces to cater to diverse needs. From sleek individual workstations for focused tasks to comfortable lounge areas for informal meetings, we offer a variety of settings to enhance your work experience. Collaborative meeting rooms equipped with the latest audiovisual technology are available for brainstorming sessions and presentations.

Our break area is a hub of activity, where colleagues gather to unwind and recharge. Stocked with complimentary refreshments, it's the perfect place to connect with coworkers, share ideas, and build relationships. We also prioritize employee well-being with dedicated wellness spaces and ergonomic furniture to ensure a comfortable and healthy work environment.

With a commitment to sustainability, our office incorporates eco-friendly practices such as energy-efficient lighting, recycling initiatives, and green building materials. We believe in making a positive impact on both our team and the environment.

The heart of any successful workplace is its people, and our team is diverse, talented, and passionate. We foster a culture of collaboration, continuous learning, and celebration of achievements. Regular team-building activities and events create a sense of community and camaraderie among our staff.

Join us in this thriving workspace where every detail is crafted to elevate your work experience. Whether you're a seasoned professional or just starting your career journey, our office provides the ideal environment for growth, innovation, and success. Welcome to a workplace that values your contributions and supports your professional aspirations.
`;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const OfferDetailsPage = () => {
  const [offerData, setOfferData] = useState({
    image: 'https://www.ceosuite.com/wp-content/uploads/2016/05/lkg-office900.jpg',
    name: 'My First Office',
    rating: 4,
    price: 19.99,
    address: 'Warsaw, Krucza 7',
    description: officeDescription,
  });

  //useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    //fetch('YOUR_API_ENDPOINT')
    //  .then((response) => response.json())
    //  .then((data) => setOfferData(data))
    //  .catch((error) => console.error('Error fetching data:', error));
  //}, []);


  const handleReserve = () => {
    // Handle reservation logic here
    console.log('Booking confirmed!');
    // You can navigate to a confirmation page or perform other actions
  };

  if (!offerData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Image source={{ uri: offerData.image }} style={styles.image} resizeMode='cover' />
            <StarRating
                disabled={true}
                maxStars={5}
                rating={offerData.rating}
                fullStarColor={'#FFD700'}
                starSize={40}
            />
            <Text style={styles.name}>{offerData.name}</Text>
            <Text style={styles.price}>Price: ${offerData.price} / day</Text>
            <Text style={styles.address}>Address: {offerData.address}</Text>
            <Text style={styles.description}>{offerData.description}</Text>
            <Button title="Reserve" onPress={handleReserve} />
        </View>
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
