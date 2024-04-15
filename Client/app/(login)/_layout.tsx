import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LoginLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default LoginLayout;

