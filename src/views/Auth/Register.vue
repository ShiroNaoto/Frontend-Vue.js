<script setup>
import { reactive, onMounted } from 'vue';
import useUsers from '@/composables/users';
import useDivisions from '@/composables/divisions';

const { storeUser, errors } = useUsers();
const { getDivisions, divisions } = useDivisions();
const logoPath = '/dist/img/logotickets.png';

onMounted(() => {
    getDivisions();
});

const form = reactive({
    name: "",
    username: "",
    email: "",
    acctype: "",
    division_id: "",
    password: "",
    password_confirmation: ""
})
</script>


<template>
    <div class="dark-mode hold-transition register-page">
        <div class="register-box">
            <div class="card card-outline card-warning bg-gradient-dark">
                <div class="card-header text-center">
                    <a href="#" class="h1"><img :src="logoPath" alt="AdminLTE Logo" class="brand-image" width="50"
                            height="50"><b> Ticket</b>
                        System</a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Register a new membership</p>

                        <div class="input-group mb-3">
                            <input type="text" id="name" v-model="form.name" class="form-control"
                                placeholder="Full name" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="text" id="username" v-model="form.username" class="form-control"
                                placeholder="Username" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Email"
                                autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-2">
                            <select id="acctype" v-model="form.acctype" class="form-control custom-select">
                                <option value="" selected disabled>Select Role</option>
                                <option value="User">User Level</option>
                                <option value="Admin">Admin Level</option>
                            </select>
                        </div>

                        <div class="input-group mb-2">
                            <select id="division_id" v-model="form.division_id" class="form-control custom-select">
                                <option value="" selected disabled>Select Division</option>
                                <option v-for="division in divisions" :key="division.id" :value="division.id">
                                    {{ division.name }}
                                </option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" id="password" v-model="form.password" class="form-control"
                                placeholder="Enter Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                                autocomplete="new-password" class="form-control" placeholder="Retype Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" required>
                                    <label for="agreeTerms">
                                        I agree to the <a href="https://www.youtube.com/watch?v=A9vmwIo0lfA">terms &
                                            noots</a>
                                    </label>
                                </div>
                            </div>

                            <div class="col-4">
                                <button @click.prevent="storeUser(form)" class="btn btn-warning btn-block">Register</button>
                            </div>
                        </div>
                    <router-link to="/" class="text-center">I already have a membership</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-page {
    background-image: url('/dist/img/cover2.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>