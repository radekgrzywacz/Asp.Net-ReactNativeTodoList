import { View, Text, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNav from './DrawerNavigator';
import { useAuth } from '../context/AuthContext';

const AppNav = () => {
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#EEEEEE" barStyle="default" />
      {authState?.authenticated ? <DrawerNav  /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
});
