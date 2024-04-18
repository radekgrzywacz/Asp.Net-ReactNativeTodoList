import { Button, View } from "react-native";
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import Todos from "../screens/Todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";

export const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    const {onLogout} = useAuth();

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
        headerRight: () => <Button onPress={onLogout} title="Sign out" />
      }}
    >
      <>
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }} />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }} />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }} />
      </>
    </Tab.Navigator>
  );
};

export default AppNavigator;