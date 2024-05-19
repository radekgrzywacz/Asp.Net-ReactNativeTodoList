import React from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import { useAuth } from "../context/AuthContext";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { onLogout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={onLogout}
          labelStyle={{ fontSize: 22, fontFamily: "medium", marginBottom: 10, color: "#EEEEEE"  }}
        />
      </View>
    </View>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AppNavigator"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "front",
        swipeEnabled: false,
        drawerStyle: {
          backgroundColor: "#627254",
        },
      }}
    >
      <Drawer.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen name="Profile settings" component={Profile} options={{
        drawerLabelStyle: {
            fontSize: 22,
            color: "#EEEEEE"
        }
      }}/>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {},
});

export default DrawerNav;
