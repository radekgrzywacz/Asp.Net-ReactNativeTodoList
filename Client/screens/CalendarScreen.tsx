import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Todo } from "../models/todo";
import useAxios from "../utils/useAxios";
import { API_URL, useAuth } from "../context/AuthContext";
import BottomSheetModalWithTodosForDay from "../components/BottomSheetModalWithTodosForDay";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Todos from "./Todos"; 

const CalendarScreen = ({navigation}) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState({});
  const { authState } = useAuth();
  const [date, setDate] = useState("");
  let api = useAxios();

  const sheetRef = useRef<BottomSheetModal>(null);

  const handleOpenPress = (day: string) => {
    setDate(day);
    sheetRef.current?.present();
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`${API_URL}/users/${authState?.id}/todos`)
      .then((response) => {
        if (response.data) {
          setTodos(response.data);
          const dueDates = response.data
            .map((todo: Todo) => todo.dueDate)
            .reduce(
              (c: any, v: any) =>
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
          style={{ top: 75 }}
          onDayPress={(day) => {
            handleOpenPress(day.dateString);
          }}
        />
      </View>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Todos')}>
          <Ionicons name="add-circle" size={70} color={"#627254"} />
        </TouchableOpacity>
      </View>
      <BottomSheetModalWithTodosForDay
        day={date}
        ref={sheetRef}
        todos={todos.filter((todo) => todo.dueDate.toString() === date)}
      />
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
  },
  text: {
    fontFamily: "bold",
  },
  calendar: {
    width: 350,
    height: 320,
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: "2%",
    bottom: "1%",
  },
});
