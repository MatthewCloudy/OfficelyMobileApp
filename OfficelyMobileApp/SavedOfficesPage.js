import React from 'react';
import { View, Text, FlatList } from 'react-native';

export function SavedOfficesPage({navigation})
{
    const savedOffices = [
        { id: 1, name: 'Office 1', location: 'Location 1' },
        { id: 2, name: 'Office 2', location: 'Location 2' },
        { id: 3, name: 'Office 3', location: 'Location 3' },
    ];

    const renderOfficeItem = ({ item }) => (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14 }}>{item.location}</Text>
        </View>
    );

    return (
        <View>
            <Text> We will display office in a same way as in the search tab</Text>
            <FlatList
                data={savedOffices}
                renderItem={renderOfficeItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

