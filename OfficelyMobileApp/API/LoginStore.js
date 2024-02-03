import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://officely.azurewebsites.net';

// TODD: check if user is admin, probably it will be done server side 
const LoginStore = create((set) => 
{
    const [data, setData] = useState("");

        useEffect(() => {
            AsyncStorage.getItem('jwttoken').then((value) => {
                setData(value);
              });
        }, []);

    return {
	jwttoken: data,
    setToken: 
        (jwttoken) => 
        {
            AsyncStorage.setItem('jwttoken', jwttoken);
            set({ jwttoken })
        },
	login: 
        async (username, password) => 
        {
            try {
                const response = await fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                });
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                const data = await response.json();
                LoginStore.getState().setToken(data.jwttoken)
                console.log(data)
            } catch (error) {
                console.error('Login failed:', error.message);
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
                    'Content-Type': 'application/json',
                    'Authorizatiox': `Bearer ${LoginStore.getState().jwttoken}`,
                  }
                });
        
                if (!response.ok) {
                  throw new Error(`Request failed: ${response.statusText}`);
                }
                set({ jwttoken: "" })
                AsyncStorage.removeItem('cookieName');
                return response;
            } catch (error) {
                console.error('Authenticated request failed:', error.message);
                throw error;
            }
        }

}});

export default LoginStore;