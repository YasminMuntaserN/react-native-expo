import { ExpensesContextProvider } from '@/context/expenses-context';
import { router, Stack, useNavigation } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2A4159',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28
          },
          headerTitleAlign: 'left',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{
          title: "Recent Expenses",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.navigate('/ManageExpense/new')}>
              <Ionicons name="add" size={24} color="#fff" style={{ margin: 10 }} />
            </TouchableOpacity>
          ),
        }} />
        <Stack.Screen name="ManageExpense" options={{
          presentation: 'modal'
        }} />
      </Stack>

    </ExpensesContextProvider>

  );
}
