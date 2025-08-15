import { ReactNode, useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updated: Expense) => void;
  TotalAmount: () => number;
}

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e7',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
];

export const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

interface ExpensesProviderProps {
  children: ReactNode;
}

export function ExpensesContextProvider({ children }: ExpensesProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  function addExpense(expense: Expense) {
    setExpenses((current) => {
      if (current.some((m) => m.id === expense.id)) return current;
      return [...current, expense];
    });
    console.log('expense', expense);
  }

  function deleteExpense(expenseId: string) {
    setExpenses((current) => current.filter((m) => m.id !== expenseId));
  }

  function updateExpense(expenseId: string, updatedData: Expense) {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === expenseId
          ? { ...expense, ...updatedData }
          : expense
      )
    );
  }

  function TotalAmount() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  const value = useMemo(() => ({
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    TotalAmount
  }), [expenses]);

  return (
    <ExpensesContext.Provider value={value} >
      {children}
    </ExpensesContext.Provider>
  );
}


export function useExpenses(): ExpensesContextType {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error("useExpenses must be used within an ExpensesContextProvider");
  }
  return ctx;
}