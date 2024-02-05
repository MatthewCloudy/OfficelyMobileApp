import React, { useEffect } from 'react';
import { View} from 'react-native';
import SavedStore from '../../API/SavedStore';
import OfficeStore from '../../API/OfficeStore';
import { Text } from 'react-native';

export function SavedPage({navigation})
{
    const [savedOffices, setSavedOffices] = React.useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchSavedOffices);

        function fetchSavedOffices() {
            SavedStore.getState().fetchSaved()
            .then(response => {
                if (!response.ok) {
                    throw new Error('No office fetched');
                }
                return response.json();
              })
            .then((data) => {

                for (let i = 0; i < data.length; i++) {
                    OfficeStore.getState().fetchOffice(data[i])
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No office fetched');
                        }
                        return response.json();
                      })
                    .then((data) => {
                        const newItem = data;
                        let updatedItems = savedOffices;
                        updatedItems.push(newItem);
                        setSavedOffices( updatedItems );
                        SavedStore.getState().setSaved(data);
                    })
                    .catch((error) => console.error('Error:', error));
                }             
            })
        }
        return unsubscribe;
    },[navigation])
    
    return (
        <View>
            <Text> Saved Offices {savedOffices}</Text>
        </View>
    );
};

