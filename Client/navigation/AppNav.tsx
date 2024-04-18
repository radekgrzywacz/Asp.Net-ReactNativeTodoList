import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import { useAuth } from '../context/AuthContext'

const AppNav = () => {
  const {authState, onLogout} = useAuth();
  return (
    <NavigationContainer>
      { authState?.authenticated ? <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
  )
}

export default AppNav