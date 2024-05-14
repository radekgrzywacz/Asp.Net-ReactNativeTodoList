import { Button, Platform, View } from "react-native";
import Home from "../screens/Home";
import CalendarScreen from "../screens/CalendarScreen";
import Todos from "../screens/Todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useState } from "react";

export const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { onLogout, authState } = useAuth();
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        headerRight: () => (
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{ marginRight: 15, top: 9 }}
              onPress={onLogout}
            >
              <Ionicons name="settings-outline" size={25} color={"white"} />
            </TouchableOpacity>
          </GestureHandlerRootView>
        ),
      }}
    >
      <>
        <Tab.Screen
          name="Todos"
          children={() => (
            <Todos isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          children={({ navigation }) => (
            <CalendarScreen
              navigation={navigation}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
            />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />
      </>
    </Tab.Navigator>
  );
};

export default AppNavigator;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
