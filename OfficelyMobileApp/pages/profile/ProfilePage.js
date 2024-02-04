import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import LoginStore from '../../API/LoginStore';

export function ProfilePage({ navigation })
{
    const [user, setUser] = useState(LoginStore.getState().user);
    const [editingPassword, setEP] = useState(false);
    const [editingEmail, setEE] = useState(false);

    const [newPassword, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [confirm, setConfirm] = useState('');
    const [match, setMatch] = useState(true);

    useEffect(() => {
        // LoginStore.getState().fetchUser()
        // .then((response) => response.json())
        // .then((data) => {
        //     setUser(data.user);
        //     LoginStore.getState().updateData(old => ({...old, user: data.user}));
        // })
        // .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const emailRegex = /\S+@\S+\.\S+/;
        if(editingPassword && newPassword !== confirm)
        {
            setMatch(false);
        }
        else if(editingEmail && (!emailRegex.test(newEmail) || newEmail !== confirm))
        {
            setMatch(false);
        }
        else
        {
            setMatch(true);
        }
    }, [newEmail, newPassword, confirm]);

    const logoutHandler = () => {
        LoginStore.getState().logout()
        .finally(() => navigation.navigate('Home'))
        .catch((error) => console.error('Error:', error));
    };

    const deleteAccountHandler = () => {
        LoginStore.getState().logout()
        .finally(() => navigation.navigate('Home'))
        .catch((error) => console.error('Error:', error));
    };

    const savePasswordHandler = () => {
        if(!match)
        {
            return;
        }
        LoginStore.getState().update({...user, password: newPassword})
        .then((data) => data.json())
        .then((data) => {
            setUser(data.user);
            LoginStore.getState().updateData(old => ({...old, user: data.user}));
        })
        .finally(setEP(false))
        .catch((error) => console.error('Error:', error));
    };

    const saveEmailHandler = () => {
        if(!match)
        {
            return;
        }
        LoginStore.getState().update({...user, email: newEmail})
        .then((data) => data.json())
        .then((data) => {
            setUser(data.user);
            LoginStore.getState().updateData(old => ({...old, user: data.user}));
        })
        .finally(setEE(false))
        .catch((error) => console.error('Error:', error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>My Reservations</Text>
                </TouchableOpacity>
                <View style={{width: 20}}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Saved offers</Text>
                </TouchableOpacity>
            </View>

            <View style = {{height: 60}}/>
            
            <Image source={require(`../../assets/profilePhoto.jpg`)} style={styles.photo} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>

            { !editingEmail && !editingPassword &&
             <View style = {styles.lowerContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setEE(true)}>
                    <Text style={styles.buttonText}>Update profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setEP(true)}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                
                <View style={{height: 100}}/>

                <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={deleteAccountHandler}>
                    <Text style={styles.buttonText}>Delete account</Text>
                </TouchableOpacity>
            </View>
            }
            {
                editingEmail && 
                <View style = {styles.lowerContainer}>
                    <Text style= {styles.updateText}>New e-mail:</Text>
                    <TextInput
                        style= {styles.updateBox}
                        onChangeText={text => setNewEmail(text)}
                    />
                    <Text style= {styles.updateText}>Confirm e-mail:</Text>
                    <TextInput
                        style= {[styles.updateBox, { borderColor: match ? 'gray' : 'red' }]}
                        onChangeText={text => setConfirm(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => saveEmailHandler}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {setEE(false); setNewEmail(""); setConfirm("");}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                editingPassword &&
                <View style = {styles.lowerContainer}>
                    <Text style= {styles.updateText}>New password:</Text>
                    <TextInput
                        style= {styles.updateBox}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />
                    <Text style= {styles.updateText}>Confirm password:</Text>
                    <TextInput
                        style= {[styles.updateBox, { borderColor: match ? 'gray' : 'red' }]}
                        secureTextEntry={true}
                        onChangeText={text => setConfirm(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => savePasswordHandler}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => {setEP(false); setPassword(""); setConfirm("");}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );

};

const styles = {

    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    email: {
        fontSize: 20,
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 160,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 130,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lowerContainer: {
        height: 350,
    },
    updateText:{
        fontSize: 13,
        fontWeight: 'bold',
    },
    updateBox:{ 
        borderWidth: 1, 
        marginBottom: 10 ,
        width: 200,
        borderColor: 'gray',
    }
};
