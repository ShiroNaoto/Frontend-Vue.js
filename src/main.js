import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

window.axios = axios;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// axios.defaults.baseURL = "http://rest-api.noot/api/v1/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";


if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Remove the token and user's info from the local storage:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            router.push({ name: 'login' });
        }
        return Promise.reject(error);
    }
);

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2);
app.mount('#app')
