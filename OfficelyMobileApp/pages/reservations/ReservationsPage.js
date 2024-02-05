import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import ReservationItem from './ReservationItem';
import ReservationStore from '../../API/ReservationStore';
import OfficeStore from '../../API/OfficeStore';

export function ReservationsPage({navigation})
{
    const [reservations, setReservations] = React.useState([]);
    const [itemsData, setData] = React.useState([]);

    useEffect(() => {
        ReservationStore.getState().fetchReservations(10, 0)
        .then((response) => response.json())
        .then((data) => {
            ReservationStore.getState().setReservations(data);
            setReservations(data);
            for (let i = 0; i < reservations.length; i++) {
                OfficeStore.getState().fetchOffice(reservations[i].officeId)
                .then((response) => response.json())
                .then((data) => {
                    const newItem = {
                        office: data,
                        reservation: reservations[i]
                    };
                    let updatedItems = itemsData;
                    updatedItems.push(newItem);
                    setData( updatedItems );
                })
                .catch((error) => console.error('Error:', error));
            }
        })
        .catch((error) => console.error('Error:', error));
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

