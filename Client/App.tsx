import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Calendar from "./screens/Calendar";
import Todos from "./screens/Todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
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
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "purple" }}>
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarIcon: ({color}) => <Ionicons name="home" size={20} color={color} /> }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({color}) => <Ionicons name="calendar-outline" size={20} color={color}/>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
