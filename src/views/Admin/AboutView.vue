<script setup>
import useUsers from "@/composables/users";
import StoreUserModal from '@/components/Admin/StoreUserModal.vue';
import UpdateUser from '@/components/Admin/UpdateUser.vue';
import Pagination from '@/components/Pagination.vue';
import { onMounted } from "vue";

const { users, getUsers, destroyUser, currentPage, totalUsers, totalPages, nextPage, prevPage, goToPage, searchQuery } = useUsers();

onMounted(() => {
    getUsers();
});

const searchUsers = () => {
    getUsers(1, searchQuery.value);
};
</script>

<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h2 class="m-0">User Lists</h2>
                    </div>
                    <StoreUserModal />
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card bg-gradient-dark">
                            <div class="card-header">
                                <h1 class="card-title">User Table</h1>
                            </div>

                            <div class="card-body bg-gradient-dark">
                                <div class="mb-4 input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-search fa-fw"></i></span>
                                    </div>
                                    <input type="text" name="search" class="form-control" placeholder="e.g: John Doe - Press Enter to Search! " v-model="searchQuery" @keyup.enter="searchUsers">
                                </div>
                                <table id="table1" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Division</th>
                                            <th>Created at</th>
                                            <th>Last update</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="users.length === 0">
                                            <td colspan="7">No users available</td>
                                        </tr>
                                        <tr v-else v-for="user in users" :key="user.id">
                                            <td class="text-center sorting_1"><span class="right badge p-2 badge-success">{{ user.acctype }}</span></td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.username }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.divid ? user.divid : 'N/A' }}</td>
                                            <td>{{ user.created }}</td>
                                            <td>{{ user.updated }}</td>
                                            <td class="d-flex justify-content-center align-items-center">
                                                <div class="btn-group ">
                                                    <a class="btn btn-app bg-success" :data-target="'#updateUser' + user.id" data-toggle="modal" style="margin-left: 10px;">
                                                        <i class="fas fa-edit"></i> Edit
                                                    </a>
                                                    <UpdateUser :user="user" :id="String(user.id)" />
                                                    <button class="btn btn-app bg-danger" @click="destroyUser(user.id)" style="margin-left: 10px;">
                                                        <i class="fas fa-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Pagination :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage" @nextPage="nextPage" @goToPage="goToPage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.page-item {
    cursor: pointer;
}

.page-item.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.page-item.active .page-link {
    background-color: #007bff;
    color: white;
}
</style>
