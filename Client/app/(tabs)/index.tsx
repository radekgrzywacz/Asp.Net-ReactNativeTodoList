import { ActivityIndicator, View, Text, StyleSheet, Platform } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(Platform.OS === "ios" ? "http://localhost:5000/api/users/1" : "http://10.0.2.2:5000/api/users/1")
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          //console.log(response.data)
        } else {
          console.log("No user found in response");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setLoading(false);
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
      <Text style={styles.text}>Hi {user.userName !== null ? user.userName : 'there'}!</Text>
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
