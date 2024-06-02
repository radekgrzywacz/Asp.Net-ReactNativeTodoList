import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import { API_URL } from "../context/AuthContext";
import axios from "axios";

const ResetPassword = ({ route, navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { email } = route.params;

  const parseErrorMessages = (errorResponse: []): string[] => {
    const errors: string[] = [];
    if (
      verificationCode.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      errors.push("Please, don't leave empty fields");
    } else if (password !== confirmPassword) {
      errors.push("Provided passwords are not the same.");
    } else {
      errorResponse.forEach((error) => {
        errors.push(error["description"]);
      });
    }
    return errors;
  };

  const handleReset = async () => {
    const data = {
      userEmail: email,
      resetToken: verificationCode,
      password: password,
    };

    axios
      .post(`${API_URL}/authentication/reset`, data)
      .catch((error) => {
        console.log(error.response.data);
        const errorMessagesArray = parseErrorMessages(error.response.data);
        setErrorMessages(errorMessagesArray);
        console.log("errors:", errorMessages);
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          navigation.navigate("Login");
        } else {
          setErrorMessages([
            "There was a problem with resetting your password.",
          ]);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text style={styles.resetText}>Reset Password Confirmation</Text>
      </View>
      <View style={styles.textInputView}>
        <Ionicons name="keypad-outline" size={20} color="#616161" />
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={verificationCode}
          placeholder="Verification Code"
          onChangeText={(text: string) => setVerificationCode(text)}
        />
      </View>
      <View style={styles.textInputView}>
        <Ionicons name="key-outline" size={20} color="#616161" />
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={password}
          placeholder="New Password"
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry={false}
        />
      </View>
      <View style={styles.textInputView}>
        <Ionicons name="key-outline" size={20} color="#616161" />
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={confirmPassword}
          placeholder="Confirm New Password"
          onChangeText={(text: string) => setConfirmPassword(text)}
          secureTextEntry={false}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          setErrorMessages([]);
          if (
            verificationCode.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
          ) {
            setErrorMessages(["Please, don't leave empty fields"]);
          } else if (password !== confirmPassword) {
            setErrorMessages(["Provided passwords are not the same."]);
          } else {
            handleReset();
          }
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resendButton}
        onPress={() => console.log("resend")}
      >
        <Text style={styles.resendButtonText}>Resend Code</Text>
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
  );
};

export default ResetPassword;

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
  resetText: {
    fontFamily: "semibold",
    fontSize: 20,
    color: "#616161",
    marginTop: 30,
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
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 7,
    bottom: 0,
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
    marginVertical: 10,
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
  resendButton: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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
  resendButtonText: {
    fontFamily: "medium",
    color: "#76885B",
    fontSize: 18,
    textAlign: "center",
  },
  errorContainer: {
    //position: "absolute",
    //top: "104%",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  errorText: {
    color: "black",
    fontFamily: "regular",
    fontSize: 14,
    textAlign: "center",
  },
});
