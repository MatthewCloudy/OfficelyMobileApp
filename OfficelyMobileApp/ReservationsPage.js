import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const ReservationItem = ({ item }) => (
    <View style={styles.flex}>
        <Image source={item.photo} style={styles.photo} />

        <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export function ReservationsPage({navigation})
{
    const reservations = [
        { id: 1, title: 'Reservation 1', description: 'Description 1', photo: require('./assets/profilePhoto.jpg') },
        { id: 2, title: 'Reservation 2', description: 'Description 2', photo: require('./assets/profilePhoto.jpg') },
        { id: 3, title: 'Reservation 3', description: 'Description 3', photo: require('./assets/profilePhoto.jpg') },
    ];

    return (
        <View>
            <FlatList
                style={styles.list}
                data={reservations}
                renderItem={ReservationItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = {
    list: {
        flexDirection: 'column',       
    },
    flex: {
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        height: 100,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 75,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginRight : 10,
        width: 40,
        height: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}

