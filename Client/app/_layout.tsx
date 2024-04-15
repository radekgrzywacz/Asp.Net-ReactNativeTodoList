import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

const RootLayout = () => {
  const [isLogged] = useState(false);
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogged ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(login)" />
      )}
    </Stack>
  );
};

export default RootLayout;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
});

