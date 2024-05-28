<script setup>
import { reactive, onMounted } from 'vue';
import useUsers from '@/composables/users';
import useDivisions from '@/composables/divisions';

const { storeUser } = useUsers();
const { getDivisions, divisions } = useDivisions();

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
});
</script>

<template>
    <div class="col-sm-6">
        <div class="breadcrumb float-sm-right">
            <button type="button" class="btn btn-block btn-warning btn-lg" data-toggle="modal"
                data-target="#modal-primary"><i class="fa fa-plus-circle mr-1"></i>
                <b>Create User</b>
            </button>
        </div>
    </div>

    <div class="modal fade" id="modal-primary">
        <div class="modal-dialog">
            <div class="modal-content bg-gradient-yellow">
                <div class="modal-header">
                    <h4 class="modal-title"><b>Create User</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body bg-gradient-warning">
                    <div class="input-group mb-3">
                        <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Full name"
                            autocomplete="off" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-id-card-alt"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" id="username" v-model="form.username" class="form-control" autocomplete="off"
                            placeholder="Username" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" id="email" v-model="form.email" class="form-control" placeholder="Email"
                            autocomplete="off" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-2">
                        <select id="acctype" v-model="form.acctype" class="form-control custom-select"
                            autocomplete="acctype" required>
                            <option value="" selected disabled>Select Role</option>
                            <option value="User">User Level</option>
                            <option value="Admin">Admin Level</option>
                        </select>
                    </div>
                    <div class="input-group mb-2">
                        <select id="division_id" v-model="form.division_id" class="form-control custom-select" required>
                            <option value="" selected disabled>Select Division</option>
                            <option v-for="division in divisions" :key="division.id" :value="division.id">
                                {{ division.name }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" id="password" v-model="form.password" class="form-control"
                            placeholder="Enter Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" id="password_confirmation" v-model="form.password_confirmation" required
                            autocomplete="new-password" class="form-control" placeholder="Retype Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-key"></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-dark" id="modalremove" data-dismiss="modal"><b>Close</b></button>
                        <button @click.prevent="storeUser(form)" class="btn btn-outline-dark"><b>Create</b></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>