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

const ModalCalendar = ({ visible, onClose, onSubmit, startDate, selectedDate, onDateChange }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <DatePicker
            options={{
              backgroundColor: "#EEEEEE",
              mainColor: "#627254",
            }}
            mode="calendar"
            minimumDate={startDate}
            selected={selectedDate}
            onDateChange={onDateChange}
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
              onPress={onSubmit}
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
};

export default ModalCalendar;