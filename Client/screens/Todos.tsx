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
import ModalCalendar from "../components/ModalCalendar";

const Todos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [todo, setTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={20} color={"#616161"} />
        </TouchableOpacity>
      </View>
      <ModalCalendar
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => console.log("submitted")}
        startDate={startDate}
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
      />
      <FlatList
        style={{ width: "90%" }}
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
    marginBottom: 10,
  },
});
