import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput } from "react-native";

const Login = () => {
  const [login, onChangeLogin] = useState("");
  const [password, onChangePassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.logoText}>The ultimate {"\n"}Todo app</Text>
        <TextInput
          style={styles.loginInput}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={login}
          placeholder="Login"
          onChangeText={onChangeLogin}
        />
        <TextInput
          style={styles.loginInput}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={password}
          placeholder="Password"
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DDDDDD",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "bold",
      padding: 6,
      fontSize: 22,
      color: "#616161",
    },
    logo: {
      backgroundColor: "#DDDDDD",
      alignItems: "center",
      padding: 15,
    },
    logoText: {
      fontFamily: "extrabold",
      fontSize: 30,
      textAlign: "center",
      marginTop: 30,
      color: "#627254",
      marginBottom: 30,
    },
    loginArea: {
      backgroundColor: "#DDDDDD",
      width: "100%",
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      //flex: 1, // Change to flex: 1
      marginBottom: "60%"
    },
    loginInput: {
      borderColor: "#627254",
      borderWidth: 2,
      width: "65%",
      borderRadius: 10,
      padding: 8,
      marginBottom: 10,
      fontSize: 20,
    },
  });
  
