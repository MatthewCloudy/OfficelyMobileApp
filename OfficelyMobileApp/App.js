import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OfferDetailsPage from './OfferDetailsPage';
import SearchPage from './SearchPage';

export default function App() {
  return (
    <View style={styles.container}>
      
      <SearchPage/>
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
