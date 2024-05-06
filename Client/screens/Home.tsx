import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";

const Home = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  console.log(authState);

  // useEffect(() => {
  //   if (authState?.id !== undefined) {
  //     console.log("W effect w home");
  //     setLoading(true);
  //     axios
  //       .get(
  //         Platform.OS === "ios"
  //           ? `http://localhost:5000/api/users/${authState.id}`
  //           : `http://10.0.2.2:5000/api/users/${authState.id}`
  //       )
  //       .then((response) => {
  //         if (response.data) {
  //           setUserName(response.data.userName);
  //           console.log("User found: ", response.data);
  //         } else {
  //           console.log("No user found in response");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [authState]);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hi {userName !== null ? userName : "there"}!
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    fontFamily: "bold",
    padding: 6,
    fontSize: 22,
    color: "#616161",
  },
});
