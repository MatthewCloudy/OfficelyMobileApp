import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import ReservationItem from './ReservationItem';
import OfficeStore from '../../API/OfficeStore';

const reservationsHard = [
    {
        reservation:
        {
            id: 124,
            userId: 3,
            officeId: 40,
            startDateTime: "2024-02-04T17:29:47.193Z",
            endDateTime: "2024-07-04T17:29:47.193Z"
        },
        office:
        {
        id: 39,
        name: "Simple apartament",
        description: "A vibrant coworking space with modern meeting rooms, situated in the heart of Warsaw.",
        pricePerDay: 300.0,
        isActive: true,
        address: "Plac Bankowy 2, Warsaw",
        availableFrom: "2024-02-03T19:14:03.+0000",
        availableTo: "2024-02-03T19:14:03.+0000",
        amenities: [
            "WIFI",
            "COFFEE",
            "WHITEBOARD"
        ],
        officeType: "COWORKING_SPACE",
        rating: 3,
        officeArea: 80,
        mainPhoto: "https://officelystorage.blob.core.windows.net/photos/a49eb813-9eaf-4cfb-bf61-cfd3f9c80d51_pexels-photo-927022.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D400.jpeg",
        photos: [
            "https://officelystorage.blob.core.windows.net/photos/a49eb813-9eaf-4cfb-bf61-cfd3f9c80d51_pexels-photo-927022.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D400.jpeg"
        ]
    }
    }
];

export function ReservationsPage({navigation})
{
    const [reservations, setReservations] = React.useState(reservationsHard);
    const [itemsData, setData] = React.useState(reservationsHard);

    useEffect(() => {
        // for (let i = 0; i < reservations.length; i++) {
        //     OfficeStore.getState().fetchOffice(reservations[i].officeId)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const newItem = {
        //             office: data,
        //             reservation: reservations[i]
        //         };
        //         const updatedItems = [...itemsData, newItem];
        //         setData( updatedItems );
        //     })
        //     .catch((error) => console.error('Error:', error));
        // }
        // console.log(itemsData)
    }, []);

    return (
        <View>
            <FlatList
                style = {styles.list}
                data = {itemsData}
                renderItem = {ReservationItem}
                keyExtractor = {(item) => item.reservation.id}
            />
        </View>
    );
};

const styles = {
    list: {
        flexDirection: 'column',       
    }
}

