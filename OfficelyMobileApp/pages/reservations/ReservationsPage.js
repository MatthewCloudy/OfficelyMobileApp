import React, { useEffect } from 'react';
import { View, FlatList} from 'react-native';
import ReservationItem from './ReservationItem';
import ReservationStore from '../../API/ReservationStore';
import OfficeStore from '../../API/OfficeStore';

export function ReservationsPage({navigation})
{
    const [reservations, setReservations] = React.useState([]);
    const [itemsData, setData] = React.useState([]);

    useEffect(() => {

        const fetchReservs = () =>
        {
            ReservationStore.getState().fetchReservations(10, 0)
            .then((response) => response.json())
            .then((data) => {
                ReservationStore.getState().setReservations(data);
                setReservations(data);

                setData([]);
                for (let i = 0; i < reservations.length; i++) {
                    OfficeStore.getState().fetchOffice(reservations[i].officeId)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Your reservation was deleted!');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        
                        const newItem = {
                            office: data,
                            reservation: reservations[i]
                        };
                        let updatedItems = itemsData;
                        updatedItems.push(newItem);
                        setData( updatedItems );
                    })
                    .catch((error) => console.warn('Error:', error));
                }
            }).catch((error) => console.warn('Error:', error));
        }
        const unsubscribe = navigation.addListener('focus', fetchReservs);
        return unsubscribe;
    }, [navigation]);

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

