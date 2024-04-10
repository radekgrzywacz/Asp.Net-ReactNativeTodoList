import { SafeAreaView, View, Text, StyleSheet } from "react-native";

const Home = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Home screen</Text>
        </View>
    )
};

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: "bold"
    }
  });