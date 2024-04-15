<template>
  <div class="container mx-auto py-8">
    <h2 class="text-3xl font-semibold mb-4">Transactions</h2>

    <div class="mb-4">
      <router-link to="/transactions/create" class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Create Transaction</router-link>
    </div>

    <table class="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 bg-gray-100 border-b">ID</th>
          <th class="px-4 py-2 bg-gray-100 border-b">Sender Account</th>
          <th class="px-4 py-2 bg-gray-100 border-b">Receiver Account</th>
          <th class="px-4 py-2 bg-gray-100 border-b">Amount</th>
          <th class="px-4 py-2 bg-gray-100 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td class="px-4 py-2 border-b">{{ transaction.id }}</td>
          <td class="px-4 py-2 border-b">{{ transaction.sender_account_id }}</td>
          <td class="px-4 py-2 border-b">{{ transaction.receiver_account_id }}</td>
          <td class="px-4 py-2 border-b">{{ transaction.amount }}</td>
          <td class="px-4 py-2 border-b">
            <router-link :to="`/transactions/${transaction.id}`" class="text-indigo-500 hover:underline">View</router-link>
            <button @click="deleteTransaction(transaction.id)" class="text-red-500 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';


export default {
  setup() {
    const transactions = ref([]);

    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/transactions');
        transactions.value = response.data.transactions;
      } catch (error) {
        console.error(error);
      }
    };

    const deleteTransaction = async (id) => {
      try {
        await axios.delete(`/transactions/${id}`);
        transactions.value = transactions.value.filter(
          (transaction) => transaction.id !== id
        );
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchTransactions);

    return {
      transactions,
      deleteTransaction,
    };
  },
};
</script>

<style>
/* Ajoutez votre style CSS personnalisé ici */
</style>