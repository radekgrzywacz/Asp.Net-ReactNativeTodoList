import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const TabsLayout = () => {
  return (
    <Tabs
    initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#627254",
        headerStyle: {
          backgroundColor: "#627254",
        },
        headerTitleStyle: {
          color: "#EEEEEE",
          fontFamily: "medium",
        },
        tabBarBackground: () => (
          <View style={{ backgroundColor: "#EEEEEE", flex: 1 }} />
        ),
      }}
    >
        <Tabs.Screen
          name="todos"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />
    </Tabs>
  );
};

export default TabsLayout;
