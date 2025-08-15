import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { useExpenses } from '@/context/expenses-context';
import { router } from 'expo-router';

const AllExpenses = () => {
  const { expenses, TotalAmount } = useExpenses();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Last 7 Days</Text>
        <Text style={styles.headerAmount}>${TotalAmount().toFixed(2)}</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          expenses.length === 0 && styles.emptyListPadding,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Text style={styles.emptyTitle}>No Expenses yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on a meal to save it.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.expenseItem} onPress={() => router.navigate(`/ManageExpense/${item.id}`)}>
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseDescription}>{item.description}</Text>
              <Text style={styles.expenseDate}>
                {item.date.toISOString().split('T')[0]}
              </Text>
            </View>
            <View style={styles.expenseAmountContainer}>
              <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#445362',
  },

  header: {
    margin: 10,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#A5C8EB',
    borderBottomWidth: 1,
    borderBottomColor: '#e2dcb6',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#041D37',
  },

  headerAmount: {
    fontWeight: '900',
    color: '#041D37',
    marginTop: 4,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  emptyListPadding: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyWrapper: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b3b3b',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#8a8278',
    textAlign: 'center',
  },

  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // for Android shadow
  },

  expenseDetails: {
    flex: 1,
    paddingRight: 10,
  },

  expenseDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c2c2c',
  },

  expenseDate: {
    fontSize: 12,
    color: '#8a8278',
    marginTop: 4,
  },

  expenseAmountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 70,
  },

  expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041D37',
  },
});
