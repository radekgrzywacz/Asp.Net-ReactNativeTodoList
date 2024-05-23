import { useEffect, useState } from "react";
import { useAuth, API_URL } from "../context/AuthContext";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import useAxios from "../utils/useAxios";
import { FlatList } from "react-native-gesture-handler";
import { Todo } from "../models/todo";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = ({
  isUpdated,
  setIsUpdated,
  todos,
  setTodos,
  todosCompleted,
  todosUncompleted,
  todosNotCompleted,
  ChangeIsDone,
  DeleteTodo,
}: any) => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  let api = useAxios();

  useEffect(() => {
    if (authState?.id !== undefined) {
      setLoading(true);
      api
        .get(`${API_URL}/users/${authState.id}`)
        .then((response) => {
          if (response.data) {
            const name = response.data.userName;
            if(name) setUserName(name);
          } else {
            setUserName("there");
          }
        })
        .catch((error) => {
          console.log("Error: ", error.response.status);
          setUserName("there");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (authState?.id !== undefined) {
      setIsUpdated(false);
      setLoading(true);
      api
        .get(`${API_URL}/users/${authState.id}/todos`)
        .then((response) => {
          if (response.data) {
            setTodos(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          Keyboard.dismiss();
          setLoading(false);
        });
    }
  }, [isUpdated]);

  if (loading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textWelcome}>
          Hi {userName}!
        </Text>
        <Text style={styles.textWelcome2}>Here is your recap:</Text>
      </View>
      <View style={styles.boxContainer}>
        <View
          style={[
            styles.Box,
            {
              backgroundColor: "#627254",
              marginRight: "50%",
              marginBottom: "-20%",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.statsText}>{todosUncompleted.length}</Text>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 15,
                color: "#EEEEEE",
                textAlign: "center",
              }}
            >
              {todosUncompleted.length === 1 ? "todo" : "todos"}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 15,
              color: "#EEEEEE",
              textAlign: "center",
              bottom: 10,
            }}
          >
            to complete
          </Text>
        </View>
        <View
          style={[
            styles.Box,
            {
              backgroundColor: "#616161",
              marginLeft: "50%",
              marginBottom: "-10%",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.statsText}>{todosCompleted.length}</Text>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 15,
                color: "#EEEEEE",
                textAlign: "center",
              }}
            >
              {todosCompleted.length === 1 ? "todo" : "todos"}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 15,
              color: "#EEEEEE",
              textAlign: "center",
              bottom: 10,
            }}
          >
            completed!
          </Text>
        </View>
        <View
          style={[
            styles.Box,
            { backgroundColor: "#D37676", marginRight: "34%" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.statsText}>{todosNotCompleted.length}</Text>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 15,
                color: "#EEEEEE",
                textAlign: "center",
              }}
            >
              {todosNotCompleted.length === 1 ? "todo" : "todos"}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 15,
              color: "#EEEEEE",
              textAlign: "center",
              bottom: 10,
            }}
          >
            failed...
          </Text>
        </View>
      </View>
      <View style={styles.upcomingTodosContainer}>
        <Text style={[styles.upcomingTodosText, {alignSelf: "flex-start"}]}>Upcoming Todos:</Text>
        <FlatList
          data={todosUncompleted.slice(0, 2)}
          ListEmptyComponent={
            <Text
              style={[
                styles.upcomingTodosText,
                { fontSize: 18, textAlign: "center", marginTop: "20%" },
              ]}
            >
             {`You do not have ${"\n"}any upcoming todos`}
            </Text>
          }
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
      </View>
    </View>
  );
};

export default Home;
const _width = Dimensions.get("screen").width * 0.35;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 10,
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  textWelcome: {
    fontFamily: "bold",
    paddingTop: 6,
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: 30,
    color: "#616161",
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowOffset: {
          width: 2,
          height: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0.2,
      },
    }),
  },
  textWelcome2: {
    fontFamily: "bold",
    paddingHorizontal: 6,
    paddingBottom: 6,
    fontSize: 22,
    color: "#616161",
    //marginBottom: "-10%"
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0.2,
      },
    }),
  },
  boxContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Box: {
    width: _width,
    height: _width,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    //position: "relative",
    marginVertical: 7,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 3,
          height: 2,
        },
        shadowColor: "black",
        shadowOpacity: 0.3,
      },
    }),
  },
  statsText: {
    color: "#EEEEEE",
    fontFamily: "semibold",
    fontSize: 40,
  },
  upcomingTodosContainer: {
    //backgroundColor:"#e6e6e6",
    padding: 10,
    //borderRadius: 10,
    //borderWidth: 2,
    //borderColor: "#627254",
    marginTop: "5%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  upcomingTodosText: {
    marginBottom: 6,
    fontFamily: "semibold",
    color: "#616161",
    fontSize: 24,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: 3,
          height: 2,
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
