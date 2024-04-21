import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const Todos = () => {
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2024/04/21");

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

      <ScrollView style={styles.scrollContainer}></ScrollView>
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
});
