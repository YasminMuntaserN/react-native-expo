import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { Expense, useExpenses } from "@/context/expenses-context";
import { getFormattedDate } from "@/util/date";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface ManageExpensesFormProps {
  isEdit: boolean;
  defaultValues?: Expense;
}

type InputField = {
  value: string;
  isValid: boolean;
};

type Inputs = {
  amount: InputField;
  date: InputField;
  description: InputField;
};

export default function ManageExpensesForm({
  isEdit,
  defaultValues,
}: ManageExpensesFormProps) {
  const [inputs, setInputs] = useState<Inputs>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: defaultValues ? defaultValues.amount > 0 : false,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      isValid: !!defaultValues?.date
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: defaultValues
        ? defaultValues.description.trim().length > 0
        : false,
    },
  });
  const [formTouched, setFormTouched] = useState(false);
  const { addExpense, updateExpense, deleteExpense } = useExpenses();
  function inputChangedHandler(
    inputIdentifier: keyof Inputs,
    enteredValue: string
  ) {
    setFormTouched(true);

    let isValid = false;
    let newValue = null;

    if (inputIdentifier === "date") {
      const parsedDate = new Date(enteredValue);
      isValid = !isNaN(parsedDate.getTime());
      newValue = enteredValue;
    } else if (inputIdentifier === "amount") {
      const amount = +enteredValue;
      isValid = !isNaN(amount) && amount > 0;
    } else {
      isValid = enteredValue.trim().length > 0;
    }

    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: {
        value: inputIdentifier === "date" ? newValue : enteredValue,
        isValid,
      },
    }));
  }

  function handleSubmit() {
    if (formIsInvalid) return;

    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value.trim(),
    };


    if (isEdit) {

      updateExpense(defaultValues?.id ?? "", {
        id: defaultValues?.id ?? "",
        amount: expenseData.amount,
        description: expenseData.description,
        date: new Date(expenseData.date),
      });
    } else {
      console.log('add')
      addExpense({
        id: new Date().toString() + Math.random().toString(),
        amount: expenseData.amount,
        description: expenseData.description,
        date: new Date(expenseData.date),
      });
    }
    router.back();
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <View style={{ margin: 20 }}>
        <View style={styles.inputsCointainer}>
          <Input
            style={{ flex: 1 }}
            label="Amount"
            invalid={formTouched && !inputs.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: (text: string) =>
                inputChangedHandler("amount", text),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={{ flex: 1 }}
            label="Date"
            invalid={formTouched && !inputs.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: (text: string) => inputChangedHandler("date", text),
              value: inputs.date.value
            }}
          />
        </View>
        <Input
          label="Decription"
          invalid={formTouched && !inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false // default is true
            onChangeText: (text: string) =>
              inputChangedHandler("description", text),
            value: inputs.description.value,
          }}
        />
      </View>
      {formTouched && formIsInvalid && (
        <Text style={styles.errorText}>
          ‼️ Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsCointainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            formIsInvalid && styles.disabledButton,
            pressed && !formIsInvalid && styles.pressed,
          ]}
          onPress={handleSubmit}
          disabled={formIsInvalid}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.calcleButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancle</Text>
        </Pressable>
      </View>
      {isEdit && (
        <Pressable
          style={[styles.deleteButton]}
          onPress={() => {
            deleteExpense(defaultValues?.id ?? "");
            router.back();
          }}
        >
          <Ionicons name="trash" size={24} color="red" />
          <Text style={{ color: "red", fontSize: 18 }}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputsCointainer: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
  },
  buttonsCointainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
    gap: 30,
    marginTop: 100,
  },
  button: {
    flex: 1,
    backgroundColor: "#469EF7",
    padding: 10,
    color: "#fff",
    fontSize: 18,
    alignItems: "center",
    borderRadius: 20,
  },
  calcleButton: {
    borderWidth: 2,
    borderColor: "#469EF7",
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
  deleteButton: {
    borderRadius: 20,
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    margin: 20,
    borderColor: "red",
    // backgroundColor: '#F8D6DB',
    padding: 10,
  },
});
