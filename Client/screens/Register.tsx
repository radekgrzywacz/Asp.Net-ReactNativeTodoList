import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";

const Register = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(userName, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const parseErrorMessages = (
    errorResponse: Record<string, string[]>
  ): string[] => {
    const errors: string[] = [];
    if (userName.length === 0 || password.length === 0 || email.length === 0) {
      errors.push("You can't leave any field empty!");
    } else {
      for (const key in errorResponse) {
        if (errorResponse.hasOwnProperty(key)) {
          errors.push(...errorResponse[key]);
        }
      }
    }
    return errors;
  };

  const register = async () => {
    const result = await onRegister!(userName, email, password);
    if (result && result.error) {
      const errorMessagesArray = parseErrorMessages(result.msg.data);
      setErrorMessages(errorMessagesArray);
      Alert.alert("Registration Error", errorMessages.join("\n"));
    } else {
      login();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={35}
            color="#627254"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.registerArea}>
        <Text style={styles.logoText}>The ultimate {"\n"}Todo app</Text>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          Hi! We are glad to welcome you!
        </Text>
        <Text
          style={{
            fontFamily: "semibold",
            fontSize: 24,
            color: "#616161",
          }}
        >
          Register
        </Text>
        <Text
          style={{
            fontFamily: "medium",
            fontSize: 16,
            color: "#616161",
            marginBottom: 1,
          }}
        >
          Create a new account{" "}
        </Text>
        <View
          style={[styles.registerInput, { marginBottom: 10, marginTop: 20 }]}
        >
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
        <View style={[styles.registerInput, { marginBottom: 10 }]}>
          <Ionicons
            style={{ marginTop: 2 }}
            name="mail-outline"
            size={20}
            color="#616161"
          />
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            value={email}
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>
        <View style={[styles.registerInput, { marginBottom: 10 }]}>
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
          style={styles.registerButton}
          onPress={() => register()}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        {errorMessages.length > 0 && (
          <View style={styles.errorContainer}>
            <FlatList
              data={errorMessages}
              renderItem={({ item }) => {
                return <Text style={styles.errorText}>{`\u2022 ${item}`}</Text>;
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={styles.text}
            suppressHighlighting={true} // Add this prop to suppress the highlight
          >
            Already signed in? Log into your account!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "regular",
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
  registerArea: {
    backgroundColor: "#EEEEEE",
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    //flex: 1, // Change to flex: 1
    marginBottom: "60%",
  },
  registerInput: {
    flexDirection: "row",
    borderColor: "#627254",
    borderWidth: 2,
    width: "65%",
    borderRadius: 20,
    padding: 8,
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 7,
  },
  registerButton: {
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
  registerButtonText: {
    fontFamily: "medium",
    color: "#EEEEEE",
    fontSize: 18,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignSelf: "flex-start",
    position: "relative",
    right: 10,
    top: 42,
    marginBottom: 25,
  },
  footer: {
    flexDirection: "row",
    paddingBottom: 40,
  },
  errorContainer: {
    position: "absolute",
    top: "104%",
    //marginTop: 10,
    padding: 10,
    //backgroundColor: "#f8d7da",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  errorText: {
    //color: "#721c24",
    color: "black",
    fontFamily: "regular",
    fontSize: 14,
    textAlign: "center",
  },
});
