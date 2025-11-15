/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} >
          <Routes />
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;