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

  useEffect(() => {
    if (authState?.id !== undefined) {
      setLoading(true);
      axios
        .get(
          Platform.OS === "ios"
            ? `http://localhost:5000/api/users/${authState.id}`
            : `http://10.0.2.2:5000/api/users/${authState.id}`
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
