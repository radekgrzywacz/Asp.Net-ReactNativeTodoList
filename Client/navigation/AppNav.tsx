import { View, Text, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import { AuthProvider, useAuth } from '../context/AuthContext'

const AppNav = () => {
  const {authState, onLogout} = useAuth();
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }else{

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#EEEEEE" barStyle="default" />
      { authState?.authenticated ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
  )
} }

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
});