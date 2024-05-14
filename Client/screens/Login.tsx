import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("radox");
  const [password, setPassword] = useState("Pa$$w0rd");
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(userName, password);
    if (result && result.error) {
      alert(result.data.status);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.logoText}>The ultimate {"\n"}Todo app</Text>
        <Text style={[styles.welcomeText, { marginBottom: 20 }]}>
          Hi! We are glad to welcome you!
        </Text>
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: 24,
            color: "#616161",
          }}
        >
          Welcome back
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 16,
            color: "#616161",
            marginBottom: 1,
          }}
        >
          Login to your account
        </Text>
        <View style={[styles.loginInput, { marginBottom: 10, marginTop: 20 }]}>
          <Ionicons
            style={{ marginTop: 2 }}
            name="person-outline"
            size={20}
            color="#616161"
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            value={userName}
            placeholder="Login"
            onChangeText={(text: string) => setUserName(text)}
          />
        </View>
        <View style={[styles.loginInput, { marginBottom: 10 }]}>
          <Ionicons
            style={{ marginTop: 2 }}
            name="key-outline"
            size={20}
            color="#616161"
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            value={password}
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
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
        <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: "regular",
    padding: 6,
    fontSize: 12,
    color: "#616161",
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
    flexDirection: "row",
    borderColor: "#627254",
    borderWidth: 2,
    width: "65%",
    borderRadius: 20,
    padding: 8,
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
  loginButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#76885B",
    backgroundColor: "#76885B",
    width: "40%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
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
  signinButton: {
    //borderWidth: 2,
    borderRadius: 20,
    //borderColor: "#76885B",
    //backgroundColor: "#EEEEEE",
    width: "40%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    //padding: 4,
    //marginTop: 4,
    ...Platform.select({
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
  signinButtonText: {
    fontFamily: "medium",
    color: "#76885B",
    fontSize: 18,
    textAlign: "center",
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 7,
  },
});
