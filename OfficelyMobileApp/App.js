import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { APIClient } from './API/APIClient';

export default function App() {

  let apiClient = new APIClient();
  apiClient.login('admin', 'admin').then(() => {
    console.log('Login successful');
    apiClient.logout().then(() => {
      console.log('Logout successful');
    })
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
