import {View, Text, StyleSheet } from "react-native";

const Todos = () => {
  return(
    <View style={styles.container}>
        <Text style={styles.text}>Todos screen</Text>
    </View>
)
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "bold"
  }
});
