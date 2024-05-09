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
import useAxios from "../utils/useAxios";
import { useAuth, API_URL } from "../context/AuthContext";

interface TodoCreationParams {
  appUserId: string;
  title: string;
  dueDate: Date;
}

interface CalendarParams {
  visible: boolean;
  onClose: any;
  today: Date;
  todo: string;
  setTodo: any;
}
const ModalCalendar = ({
  visible,
  onClose,
  today,
  todo,
  setTodo,
}: CalendarParams) => {
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY-MM-DD"
  );
  const [selectedDate, setSelectedDate] = useState(startDate);
  let api = useAxios();
  const { authState } = useAuth();
  const UserId = authState?.id;

  const onCreateTodo = async ({
    appUserId,
    title,
    dueDate,
  }: TodoCreationParams) => {
    try {
      const todo = {
        appUserId: appUserId,
        title: title,
        dueDate: dueDate,
      };
      return await api
        .post(`${API_URL}/users/${authState?.id}/todos`, todo)
        .catch((error) => {
          console.log(error.response.status);
        });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
          </View>
          <DatePicker
            options={{
              backgroundColor: "#EEEEEE",
              mainColor: "#627254",
            }}
            mode="calendar"
            minimumDate={startDate}
            selected={selectedDate}
            onDateChange={(selectedDate) => {
              const modifiedDate = selectedDate.replaceAll("/", "-");
              setSelectedDate(modifiedDate);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flex: 1, alignSelf: "flex-start" }}
              onPress={onClose}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                onCreateTodo({
                  appUserId: UserId,
                  title: todo,
                  dueDate: selectedDate,
                });
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
  addTodoBox: {
    marginTop: 10,
    borderWidth: 2,
    padding: 7,
    borderRadius: 16,
    borderColor: "#627254",
    width: "90%",
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    marginBottom: 7,
  },
};

export default ModalCalendar;
