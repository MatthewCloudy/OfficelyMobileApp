import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export function ProfilePage({ nafigation })
{
    useEffect(() => {
        // fetch user data
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>My Reservations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Saved offers</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 60}}/>

            <Image source={require('./assets/profilePhoto.jpg')} style={styles.photo} />
            <Text style={styles.username}>Marcin User</Text>
            <Text style={styles.email}>marcin@marcin.marcin</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            
            <View style={{height: 60}}/>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {

    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight : 10,
        width: 180,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 140,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
};
