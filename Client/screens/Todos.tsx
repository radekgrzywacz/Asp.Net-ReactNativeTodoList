import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import axios from "axios";
import { Todo } from "../models/todo";

const Todos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startDate);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        Platform.OS === "ios"
          ? `http://localhost:5000/api/users/11/todos`
          : `http://10.0.2.2:5000/api/users/11/todos`
      )
      .then((response) => {
        if (response.data) {
          setTodos(response.data);
        } else {
          console.log("Couldn't find any todos");
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
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
    <View style={styles.container}>
      <View style={styles.addTodoBox}>
        <TextInput
          style={{ flex: 1 }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={todo}
          placeholder="Add Item"
          onChangeText={(text: string) => setTodo(text)}
        />
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => setOpen(true)}
        >
          <Ionicons name="add-circle" size={20} color={"#616161"} />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.addTodoBox}>
              <TextInput
                style={{ flex: 1 }}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                value={todo}
                placeholder="Add Item"
                onChangeText={(text: string) => setTodo(text)}
              />
            </View>
            <DatePicker
              options={{
                backgroundColor: "#EEEEEE",
                mainColor: "#627254",
              }}
              mode="calendar"
              minimumDate={startDate}
              selected={selectedDate}
              onDateChange={(propDate) => setSelectedDate(propDate)}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flex: 1, alignSelf: "flex-start" }}
                onPress={() => setOpen(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => console.log("submited", selectedDate)}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{width: "90%"}}
        data={todos}
        renderItem={({ item }: { item: Todo }) => {
          return (
            <View style={styles.todoContainer}>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  addTodoBox: {
    borderWidth: 2,
    padding: 7,
    borderRadius: 16,
    width: "85%",
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    marginBottom: 7,
  },
  scrollContainer: {
    padding: 5,
    backgroundColor: "#EEEEEE",
    width: "90%",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  todoContainer: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10
  },
});
