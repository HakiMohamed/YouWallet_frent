<template>
    <div class="flex items-center justify-center h-screen">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold mb-4">Login</h2>
        <form @submit="login" class="space-y-4">
          <div class="flex flex-col">
            <label for="username" class="mb-1 text-gray-700">Username:</label>
            <input type="text" id="username" v-model="username" required class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
          </div>
          <div class="flex flex-col">
            <label for="password" class="mb-1 text-gray-700">Password:</label>
            <input type="password" id="password" v-model="password" required class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
          </div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
          <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Login</button>
        </form>
  
        <p>Don't have an account?</p>
        <router-link to="/register" class="text-indigo-500 hover:underline">Register</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref('');
  
      const login = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value
            })
          });
  
          if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            console.log('Login successful');
            const router = useRouter();
            router.push('/transactions');
          } else {
            const data = await response.json();
            error.value = data.error;
          }
        } catch (error) {
          console.error(error);
          error.value = 'An error occurred during login.';
        } 
      };
  
      return {
        username,
        password,
        error,
        login
      };
    }
  };
  </script>
  
  <style>
  /* Ajoutez votre style CSS personnalisé ici */
  </style>