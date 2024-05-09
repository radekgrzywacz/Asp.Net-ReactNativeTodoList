import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  SectionList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { getFormatedDate } from "react-native-modern-datepicker";
import axios from "axios";
import { Todo } from "../models/todo";
import ModalCalendar from "../components/ModalCalendar";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuth, API_URL } from "../context/AuthContext";
import useAxios from "../utils/useAxios";

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const Todos = () => {
  const { authState } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const today = new Date();
  const [todo, setTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  let api = useAxios();

  useEffect(() => {
    if (authState?.id !== undefined) {
      setIsUpdated(false)
      setLoading(true);
      axios
        .get(`${API_URL}/users/${authState.id}/todos`)
        .then((response) => {
          if (response.data) {
            setTodos(response.data);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isUpdated]);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const todosNotCompleted = todos.filter(
    (todo) => !todo.isDone && new Date(todo.dueDate) < yesterday
  );
  const todosUncompleted = todos.filter(
    (todo) => !todo.isDone && (new Date(todo.dueDate) > today || isSameDay(new Date(todo.dueDate), today))
  );
  const todosCompleted = todos.filter((todo) => todo.isDone);

  const DATA = [
    {
      title: "To do:",
      data: todosUncompleted,
    },
    {
      title: "Completed:",
      data: todosCompleted,
    },
    {
      title: "Not completed...",
      data: todosNotCompleted,
    },
  ];

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
          style={{ flex: 1, fontFamily: "regular", fontSize: 17 }}
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
      {todos.length > 0 ? (
        <SectionList
          style={{ width: "90%", marginTop: 70 }}
          sections={DATA}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                alignSelf: "baseline",
                marginLeft: 23,
                fontFamily: "extrabold",
                fontSize: 18,
                color: "#627254",
              }}
            >
              {title}
            </Text>
          )}
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
                  isChecked={item.isDone === 0 ? false : true}
                />
              </View>
            );
          }}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              alignSelf: "center",
              marginLeft: 23,
              fontFamily: "extrabold",
              fontSize: 18,
              color: "#627254",
              textAlign: "center",
            }}
          >
            Your todo list is completly empty! Add some todos!
          </Text>
        </View>
      )}

      <ModalCalendar
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        today={today}
        todo={todo}
        setTodo={setTodo}
        setIsUpdated={setIsUpdated}
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
    position: "absolute",
    top: 5,
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
