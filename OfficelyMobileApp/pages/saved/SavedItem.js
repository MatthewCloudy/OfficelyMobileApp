import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import SavedStore from '../../API/SavedStore';
import { useNavigation } from '@react-navigation/native';


library.add(faSquareParking);
library.add( faTrashCan );

const SavedItem = ({ item }) =>
{
    //const navigation = useNavigation();
    
    const itemPressedHandler = () =>
    {
        // setOfficeId(item.id);
        // navigation.navigate("OfferDetailsPage");
    };

    const deleteHandler = () =>
    {
        SavedStore.getState().deleteSaved(item.officeId)
    };

    const formatDate = (date) =>
    {
        return date.substring(0, 10);
    }

    return (
    <TouchableOpacity onPress={itemPressedHandler}>
        <View style={styles.flex}>
            {/* <Image source={{ uri: item.mainPhoto}} style={styles.photo} /> */}
            <Image source={{ uri: 'https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_185193-110089.jpg'}} style={styles.photo} />
            <View>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={styles.button} onPress={deleteHandler}>
                    <FontAwesomeIcon icon={faTrashCan} style={styles.icon} size={25}/>
                </TouchableOpacity>
            </View> 
        </View>
    </TouchableOpacity>)
};

const styles = {
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
        borderRadius: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 2,
        borderRadius: 5,
        marginBottom : 5,
        marginRight: 5,
        width: 35,
        height: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    icon: {
        color: 'white',
    }
}

export default SavedItem;