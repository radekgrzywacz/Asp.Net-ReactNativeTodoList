import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";

const Login = () => {
  const [login, onChangeLogin] = useState("");
  const [password, onChangePassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.logoText}>The ultimate {"\n"}Todo app</Text>
        <TextInput
          style={[styles.loginInput, { marginBottom: 10 }]}
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
        <View style={styles.forgotPasswordText}>
          <TouchableOpacity
            onPress={() => console.log("go to forgot password screen")}
          >
            <Text
              style={styles.text}
              suppressHighlighting={true} // Add this prop to suppress the highlight
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => console.log("Logged")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "light",
    padding: 6,
    fontSize: 12,
    color: "#616161",
  },
  logo: {
    backgroundColor: "#EEEEEE",
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
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 3,
          height: 2,
        },
        shadowColor: "black",
        shadowOpacity: 0.2,
      },
    }),
  },
  loginArea: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    //flex: 1, // Change to flex: 1
    marginBottom: "60%",
  },
  loginInput: {
    borderColor: "#627254",
    borderWidth: 2,
    width: "65%",
    borderRadius: 20,
    padding: 8,
    fontSize: 20,
  },
  loginButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#76885B",
    backgroundColor: "#76885B",
    width: "40%",
    height: "13%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    marginTop: 7,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 3,
          height: 2,
        },
        shadowColor: "black",
        shadowOpacity: 0.2,
      },
    }),
  },
  loginButtonText: {
    fontFamily: "medium",
    color: "#EEEEEE",
    fontSize: 18,
  },
  forgotPasswordText: {
    
  },
});
