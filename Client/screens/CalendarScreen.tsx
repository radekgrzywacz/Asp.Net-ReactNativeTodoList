import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Todo } from "../models/todo";
import axios from "axios";
import useAxios from "../utils/useAxios";

const CalendarScreen = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState<string[]>([]);
  let api = useAxios();

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`http://10.0.2.2:5000/api/users/11/todos`)
      .then((response) => {
        if (response.data) {
          setTodos(response.data);
          const dueDates = response.data
            .map((todo) => todo.dueDate)
            .reduce(
              (c, v) =>
                Object.assign(c, {
                  [v]: { selected: false, marked: true, dotColor: "#627254" },
                }),
              {}
            );
          setDates(dueDates);
        } else {
          console.log("Couldn't find any todos");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          minDate={formattedDate}
          markedDates={dates}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: "white",
            calendarBackground: "#EEEEEE",
            dayTextColor: "black",
            textDisabledColor: "#CCCCCC",
            todayTextColor: "#849C61",
            textDayFontFamily: "regular",
            arrowColor: "#627254",
          }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "red" }}></View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    fontFamily: "bold",
  },
  calendar: {
    width: 350,
    height: 320,
    flex: 1,
  },
});
