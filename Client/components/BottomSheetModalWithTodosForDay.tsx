import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Todo } from "../models/todo";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";

export type Ref = BottomSheetModal;

interface Props {
  todos: Todo[];
  day: string;
}

const BottomSheetModalWithTodosForDay = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "45%", "75%"], []);

  const date = new Date(props.day);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const renderItem = useCallback(({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        {item.isDone === 1 && (
          <Ionicons name="checkmark-circle" size={24} color="#627254" style={{flexDirection: "row", paddingRight: 16, top: 1}} />
        )}
       </View>
    );
  }, []);
  
  const renderEmpty = useCallback(() => {
    return (
      <View >
        <Text style={styles.emptyListText}>There are no todos for today!</Text>
      </View>
    );
  }, []);
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={1}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#627254" }}
      style={styles.bottomSheet}
      handleIndicatorStyle={{backgroundColor: "#EEEEEE"}}
    >
      <BottomSheetFlatList
        data={props.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 2, backgroundColor: '#EEEEEE'}} />
          <View>
            <Text style={styles.sheetHeader}>{date.toDateString()}</Text>
          </View>
          <View style={{flex: 1, height: 2, backgroundColor: '#EEEEEE'}} />
        </View>
        )}
        ListEmptyComponent={renderEmpty}
      />
    </BottomSheetModal>
  );
});

export default BottomSheetModalWithTodosForDay;

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  sheetHeader: {
    fontFamily: "bold",
    fontSize: 20,
    //alignSelf: "center",
    //marginBottom: 10,
    color: "#EEEEEE",
    borderBottomWidth: 1,
    borderBlockColor: "black",
    textAlign: "center"
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
    flexDirection: "row",
  },
  todoTitle: {
    flex: 2,
    fontFamily: "semibold",
    fontSize: 18,
    color: "black",
    alignSelf: "center",
    paddingLeft: 16,
  },
  emptyListText: {
    marginTop: 10,
    color: "#EEEEEE",
    fontFamily: "medium",
    fontSize: 20,
    alignSelf: "center"
  }
});
