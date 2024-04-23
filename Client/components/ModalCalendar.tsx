import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const ModalCalendar = ({open, onCloseModal}) => {
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [todo, setTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState("2024/04/21");

  const handleCloseModal = () => {
    onCloseModal();
  };

  
  return (
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
              onPress={handleCloseModal}
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
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  addTodoBox: {
    borderWidth: 2,
    padding: 7,
    borderRadius: 16,
    width: "85%",
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    marginBottom: 7,
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
