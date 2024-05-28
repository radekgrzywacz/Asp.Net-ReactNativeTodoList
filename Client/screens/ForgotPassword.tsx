import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={35}
            color="#627254"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.logoText}>The ultimate {"\n"}Todo app</Text>
        <Text style={[styles.text, { marginBottom: 20 }]}>
          Hi! We are glad to welcome you!
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.resetText}>Forgot password</Text>
        <Text style={styles.resetText2}>
          Enter your email address below to reset your password.
        </Text>
      </View>
      <View style={[styles.textInputView, { marginBottom: 10 }]}>
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
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("ResetPassword")}
      >
        <Text style={styles.submitButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "flex-start",
    bottom: 6,
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
  resetText: {
    fontFamily: "semibold",
    fontSize: 24,
    color: "#616161",
    marginTop: 30,
  },
  resetText2: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#616169",
    textAlign: "center",
    marginTop: 3,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textInputView: {
    flexDirection: "row",
    borderColor: "#627254",
    borderWidth: 2,
    width: "75%",
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
  submitButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#76885B",
    backgroundColor: "#76885B",
    width: "75%",
    height: "5.3%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 10,
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
  submitButtonText: {
    fontFamily: "medium",
    color: "#EEEEEE",
    fontSize: 18,
  },
});
