<template>
    <div class="flex items-center justify-center h-screen">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold mb-4">Register</h2>
        <form @submit="register" class="space-y-4">
          <div class="flex flex-col">
            <label for="username" class="mb-1 text-gray-700">Username:</label>
            <input type="text" id="username" v-model="username" required class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
          </div>
          <div class="flex flex-col">
            <label for="password" class="mb-1 text-gray-700">Password:</label>
            <input type="password" id="password" v-model="password" required class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500">
          </div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
          <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Register</button>
        </form>

        <p>already have an account</p>
        <router-link to="/login" class="text-indigo-500 hover:underline">Login</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref('');
  
      const register = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/register', {
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
            console.log('Registration successful');
          } else {
            const data = await response.json();
            error.value = data.error;
          }
        } catch (error) {
          console.error(error);
          error.value = 'An error occurred during registration.';
        }
      };
  
      return {
        username,
        password,
        error,
        register
      };
    }
  };
  </script>
  
  <style>
  /* Ajoutez votre style CSS personnalisé ici */
  </style>