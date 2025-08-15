import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import ManageExpensesForm from "@/components/ManageExpensesForm";
import { useExpenses } from "@/context/expenses-context";

const ManageExpenses = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { expenses } = useExpenses();
  const defaultValues = expenses.find((expense) => expense.id === id);

  console.log("Manage Expenses ID:", id, "Default Values:", defaultValues);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: !!id && id !== "new" ? "Edit Expenses" : "Add Expenses",
    });
  }, [navigation, id]);

  return (
    <View style={styles.container}>
      <ManageExpensesForm
        isEdit={!!id && id !== "new"}
        defaultValues={defaultValues}
      />
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#445362",
    padding: 10,
  },
});
