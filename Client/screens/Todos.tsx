import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  SectionList,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Todo } from "../models/todo";
import ModalCalendar from "../components/ModalCalendar";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuth, API_URL } from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const Todos = ({
  isUpdated,
  setIsUpdated,
  todos,
  setTodos,
  todosCompleted,
  todosUncompleted,
  todosNotCompleted,
  ChangeIsDone,
  DeleteTodo
}: any) => {
  const { authState } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const today = new Date();
  const [todo, setTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  

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
                  bounceEffectIn={0.9}
                  iconStyle={{ borderWidth: 2, borderColor: "#76885B" }}
                  textStyle={{ fontFamily: "regular" }}
                  style={{ flex: 2 }}
                  isChecked={item.isDone === 0 ? false : true}
                  onPress={() => {
                    ChangeIsDone(item.id, item.isDone === 1 ? 0 : 1);
                  }}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    bottom: 22,
                  }}
                  onPress={() => DeleteTodo(item.id)}
                >
                  <Ionicons name="trash" size={20} color="#616161" />
                </TouchableOpacity>
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
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0.3,
      },
    }),
  },
  todoContainer: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#627254",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#DDDDDD",
    paddingTop: 7,
    paddingBottom: 7,
    //height: "25%"
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0.3,
      },
    }),
  },
  dueDate: {
    fontFamily: "semibold",
    fontSize: 15,
    color: "grey",
    marginBottom: 5,
    marginLeft: 2,
  },
});
