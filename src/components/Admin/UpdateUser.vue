<script setup>
import { onMounted } from 'vue';
import useUsers from '@/composables/users';
import useDivisions from '@/composables/divisions';

const { user, getUser, updateUser, errors } = useUsers();
const { getDivisions, divisions } = useDivisions();

const props = defineProps({
    id: {
        required: true,
        type: String,
    },
});

onMounted(() => {
    getDivisions();
    getUser(props.id);
});
</script>


<template>
    <div class="modal fade" :id="'updateUser' + id" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content bg-primary">
                <div class="modal-header">
                    <h4 class="modal-title">Update User</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <form @submit.prevent="updateUser(id)">
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input type="text" v-model="user.name" :id="'name_' + id" name="name" class="form-control"
                                placeholder="Full name" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-id-card-alt"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" v-model="user.username" :id="'username_' + id" name="username"
                                class="form-control" placeholder="Username" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" v-model="user.email" :id="'email_' + id" name="email"
                                class="form-control" placeholder="Email" autocomplete="off">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-2">
                            <select v-model="user.acctype" name="acctype" class="form-control custom-select">
                                <option value="" selected>Select Role</option>
                                <option value="user">User Level</option>
                                <option value="admin">Admin Level</option>
                            </select>
                        </div>
                        <div class="input-group mb-2">
                            <select v-model="user.division_id" name="division_id" class="form-control custom-select">
                                <option value="" selected disabled>Select Division</option>
                                <option v-for="division in divisions" :key="division.id" :value="division.id">
                                    {{ division.name }}
                                </option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password" name="password" class="form-control"
                                placeholder="Enter New Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password_confirmation" name="password_confirmation"
                                class="form-control" placeholder="Retype New Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-key"></span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-outline-light" :id="'modalremove' + id" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-outline-light">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
