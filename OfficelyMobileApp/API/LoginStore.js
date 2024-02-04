import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const LoginStore = create((set) => 
{
    return {
	jwttoken: "",
    user: {id:0, username: "Marcin", email: "marcin@marcin.pl", isAdmin: false},
    updateData:
        (data) =>
        {
            set({ jwttoken: data.jwttoken, user: data.user})
            AsyncStorage.setItem('jwttoken', data.jwttoken);
            AsyncStorage.setItem('user', JSON.stringify(data.user));
        },
    fetchUser:
        async () => fetch(`${url}/users/${LoginStore.getState().user.id}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorizatiox': `Bearer ${LoginStore.getState().jwttoken}`
        }}),
	login: 
        async (username, password) => 
        {
            try {
                const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                });
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                const data = await response.json();
                LoginStore.getState().updateData(data)
            } catch (error) {
                console.error('Login failed:', error.message);
                throw error;
            }
        },
    register:
        async (username, email, password) =>
        {
            try {
                console.log(JSON.stringify([{id:0, username, password, email, isAdmin: false}]))
                const response = await fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{id:0, username, password, email, isAdmin: false}]),
                });
                if (!response.ok) {
                    throw new Error('Invalid registration data');
                }
                const data = await response.json();
                await LoginStore.getState().login(username, password)
                } catch (error) {
                console.error('Register failed:', error.message);
                throw error;
            }
        },
    update:
        async (user) =>
        {
            try {
                const response = await fetch(`${url}/users/${user.Id}`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorizatiox': `Bearer ${LoginStore.getState().jwttoken}`,
                },
                body: JSON.stringify(user),
                });
                if (!response.ok) {
                    throw new Error('Invalid registration data');
                }
                const data = await response.json();
                LoginStore.getState().updateData(data)
                console.log(data)
            } catch (error) {
                console.error('Register failed:', error.message);
                throw error;
            }
        },
	logout: 
        async () => 
        {      
            try {     
                const response = await fetch(`${url}/auth/logout`, {
                  method: 'POST',
                  headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorizatiox': `Bearer ${LoginStore.getState().jwttoken}`,
                  }
                });
        
                if (!response.ok) {
                  throw new Error(`Request failed: ${response.statusText}`);
                }
                set({ jwttoken: "", user: {}})
                AsyncStorage.removeItem('cookieName');
                return response;
            } catch (error) {
                console.error('Authenticated request failed:', error.message);
                throw error;
            }
        }
}});

export default LoginStore;