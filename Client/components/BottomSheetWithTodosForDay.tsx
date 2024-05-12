import { View, Text, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Todo } from "../models/todo";

export type Ref = BottomSheet;

interface Props {
  todos: Todo[];
}

const BottomSheetWithTodosForDay = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

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
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetFlatList
        data={props.todos}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
      />
    </BottomSheet>
  );
});

export default BottomSheetWithTodosForDay;

const styles = StyleSheet.create({});
