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
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
          style={{ flex: 1, fontFamily: "regular", fontSize: 17}}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={todo}
          placeholder="Add Item"
          onChangeText={(text: string) => setTodo(text)}
        />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginBottom: 2 }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={25} color={"#616161"} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          alignSelf: "baseline",
          marginLeft: 23,
          fontFamily: "extrabold",
          fontSize: 18,
          color: "#627254"
        }}
      >
        To do:
      </Text>
      <FlatList
        style={{ width: "90%" }}
        data={todos}
        renderItem={({ item }: { item: Todo }) => {
          return (
            <View style={styles.todoContainer}>
              <Text style={styles.dueDate}>{item.dueDate}</Text>
              <BouncyCheckbox
                size={20}
                fillColor="#76885B"
                text={item.title}
                bounceEffectIn={0.3}
                iconStyle={{ borderWidth: 2, borderColor: "#76885B" }}
                textStyle={{ fontFamily: "regular" }}
                style={{ flex: 2 }}
              />
            </View>
          );
        }}
      />
      <ModalCalendar
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => console.log("submitted")}
        startDate={startDate}
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
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
    marginTop: 10,
    borderWidth: 2,
    padding: 7,
    borderRadius: 16,
    borderColor: "#627254",
    width: "90%",
    height: "7%",
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    marginBottom: 7,
  },
  todoContainer: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#627254",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
    paddingTop: 7,
  },
  dueDate: {
    fontFamily: "semibold",
    fontSize: 15,
    color: "grey",
    marginBottom: 5,
    marginLeft: 2,
  },
});
