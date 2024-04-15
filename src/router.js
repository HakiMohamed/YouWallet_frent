import {createRouter, createWebHistory} from'vue-router';
import Login from './components/LoginForm.vue';
import Register from './components/RegisterForm.vue';
import Transactions from './components/TransactionsPage.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/transactions', component: Transactions },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;