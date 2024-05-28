import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import { useAuth } from "../context/AuthContext";
import Profile from "../screens/Profile";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { onLogout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={() => onLogout()}
          labelStyle={{
            fontSize: 22,
            fontFamily: "medium",
            marginBottom: 10,
            color: "#EEEEEE",
          }}
        />
      </View>
    </View>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        drawerPosition: "right",
        drawerType: "front",
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: "#627254",
        },
        drawerActiveTintColor: "white",
        headerStyle: {
          backgroundColor: "#627254",
        },
        headerTitleStyle: {
          color: "#EEEEEE",
          fontFamily: "medium",
        },
        headerLeft: false,
        headerRight: () => (
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{ marginRight: 15, top: 9 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="settings-outline" size={25} color={"white"} />
            </TouchableOpacity>
          </GestureHandlerRootView>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={AppNavigator}
        options={{
          //drawerItemStyle: { height: 0 },
          drawerLabelStyle: {
            fontSize: 22,
            color: "#EEEEEE",
          },
        }}
      />
      <Drawer.Screen
        name="Profile settings"
        component={Profile}
        options={{
          drawerLabelStyle: {
            fontSize: 22,
            color: "#EEEEEE",
          },
          headerShown: true,
          drawerPosition: "right",
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {},
});

export default DrawerNav;
