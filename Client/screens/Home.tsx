import { useEffect, useState } from "react";
import { useAuth, API_URL } from "../context/AuthContext";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import axios from "axios";
import useAxios from "../utils/useAxios";

const Home = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  let api = useAxios();

  useEffect(() => {
    if (authState?.id !== undefined) {
      setLoading(true);
      api
        .get(
          Platform.OS === "ios"
            ? `${API_URL}/users/${authState.id}`
            : `${API_URL}/users/${authState.id}`
        )
        .then((response) => {
          if (response.data) {
            setUserName(response.data.userName);
          } else {
          }
        })
        .catch((error) => {
          console.log("Error: ",error.response.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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
