import {View, Text, StyleSheet } from "react-native";

const Calendar = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Callendar screen</Text>
        </View>
    )
};

export default Calendar;

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