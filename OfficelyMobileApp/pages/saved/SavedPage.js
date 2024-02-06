import React, { useEffect } from 'react';
import { View} from 'react-native';
import SavedStore from '../../API/SavedStore';
import OfficeStore from '../../API/OfficeStore';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SavedItem from './SavedItem';

export function SavedPage({navigation})
{
    const [savedOffices, setSavedOffices] = React.useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchSavedOffices);

        function fetchSavedOffices() {
            SavedStore.getState().fetchSaved()
            .then(response => {
                if (!response.ok) {
                    console.warn('No office fetched');
                }
                return response.json();
              })
            .then((data) => {
                let offices = [];
                SavedStore.getState().setSaved([]);
                for (let i = 0; i < data.length; i++) {
                    OfficeStore.getState().fetchOffice(data[i])
                    .then(response => {
                        if (!response.ok) {
                            console.warn('No office fetched');
                        }
                        return response.json();
                      })
                    .then((data) => {
                        const newItem = data;
                        offices.push(newItem);
                        setSavedOffices( offices );
                        SavedStore.getState().setSaved(newItem);
                    })
                    .catch((error) => console.warn('Error:', error));
                }          
            })
        }
        return unsubscribe;
    },[navigation])
    
    return (
        <View>
            <FlatList
                style = {styles.list}
                data = {savedOffices}
                renderItem = {SavedItem}
                keyExtractor = {(item) => item.id}
            />
        </View>
    );
};

const styles = {
    list: {
        flexDirection: 'column',       
    }
}
