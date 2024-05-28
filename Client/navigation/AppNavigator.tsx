import { View } from "react-native";
import Home from "../screens/Home";
import CalendarScreen from "../screens/CalendarScreen";
import Todos from "../screens/Todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { API_URL, useAuth } from "../context/AuthContext";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useState } from "react";
import { Todo } from "../models/todo";
import useAxios from "../utils/useAxios";

export const Tab = createBottomTabNavigator();

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const AppNavigator = ({ navigation }: { navigation: any}) => {
  const { onLogout, authState } = useAuth();
  const [isUpdated, setIsUpdated] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const todosNotCompleted = todos.filter(
    (todo: Todo) => !todo.isDone && new Date(todo.dueDate) < yesterday
  );
  const todosUncompleted = todos.filter(
    (todo: Todo) =>
      !todo.isDone &&
      (new Date(todo.dueDate) > today ||
        isSameDay(new Date(todo.dueDate), today))
  );
  const todosCompleted = todos.filter((todo: Todo) => todo.isDone);

  let api = useAxios();

  const ChangeIsDone = async (todoId: number, value: number) => {
    await api({
      method: "patch",
      url: `${API_URL}/users/${authState?.id}/todos/${todoId}`,
      data: `
      [
        {
            "op" : "replace",
            "path": "/isDone",
            "value": ${value}
        }
      ]
      `,
      headers: { "Content-Type": "application/json-patch+json" },
    });

    setIsUpdated(true);
  };

  const DeleteTodo = async (todoId: number) => {
    try {
      await api
        .delete(`${API_URL}/users/${authState?.id}/todos/${todoId}`)
        .catch((error) => {
          alert(error.msg);
        })
        .finally(() => setIsUpdated(true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#627254",
        headerStyle: {
          backgroundColor: "#627254",
        },
        headerTitleStyle: {
          color: "#EEEEEE",
          fontFamily: "medium",
        },
        tabBarBackground: () => (
          <View style={{ backgroundColor: "#EEEEEE", flex: 1 }} />
        ),
        headerRight: () => (
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{ marginRight: 15, top: 9 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="settings-outline" size={25} color={"white"} />
            </TouchableOpacity>
          </GestureHandlerRootView>
        ),
      }}
    >
      <>
        <Tab.Screen
          name="Todos"
          children={() => (
            <Todos
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
              todos={todos}
              setTodos={setTodos}
              todosUncompleted={todosUncompleted}
              todosCompleted={todosCompleted}
              todosNotCompleted={todosNotCompleted}
              ChangeIsDone={ChangeIsDone}
              DeleteTodo={DeleteTodo}
            />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          children={() => (
            <Home
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
              todos={todos}
              setTodos={setTodos}
              todosUncompleted={todosUncompleted}
              todosCompleted={todosCompleted}
              todosNotCompleted={todosNotCompleted}
              ChangeIsDone={ChangeIsDone}
              DeleteTodo={DeleteTodo}
            />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          children={({ navigation }) => (
            <CalendarScreen
              navigation={navigation}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
              todos={todos}
              setTodos={setTodos}
            />
          )}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />
      </>
    </Tab.Navigator>
  );
};

export default AppNavigator;
