<script setup>
import useDivisions from "../../composables/divisions";
import StoreDiv from "@/components/Admin/StoreDivModal.vue";
import UpdateDiv from "@/components/Admin/UpdateDiv.vue";
import Pagination from '@/components/Pagination.vue';
import { onMounted } from "vue";

const { divisions, getDivPage, destroyDivision, currentPage, totalPages, nextPage, prevPage, goToPage, totalDiv, searchQuery } = useDivisions();
onMounted(() => {
    getDivPage();
});

const searchUsers = () => {
    getDivPage(1, searchQuery.value);
};
</script>

<template>
    <div class="content-wrapper">
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Division lists</h1>
                    </div>
                    
                    <StoreDiv />
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card bg-gradient-dark">
                            <div class="card-header">
                                <h1 class="card-title">Division Table</h1>
                            </div>

                            <div class="card-body bg-gradient-dark">
                                <div class="mb-4 input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-search fa-fw"></i></span>
                                    </div>
                                    <input type="text" class="form-control" name="search" placeholder="e.g: John Doe - Press Enter to Search! " v-model="searchQuery" @keyup.enter="searchUsers">
                                </div>
                                <table id="table1" class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Division Name</th>
                                            <th>Division Code</th>
                                            <th>Division Head</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="divisions.length === 0">
                                            <td colspan="5">No divisions available</td>
                                        </tr>
                                        <tr v-else v-for="division in divisions" :key="division.id">
                                            <td>{{ division.name }}</td>
                                            <td>{{ division.code }}</td>
                                            <td>{{ division.head }}</td>
                                            <td>{{ division.duty }}</td>
                                            <td class="d-flex justify-content-center align-items-center">
                                                <div class="btn-group">
                                                    <button class="btn btn-app bg-success"
                                                        :data-target="'#updateDivision' + division.id"
                                                        data-toggle="modal" style="margin-left: 10px;">
                                                        <i class="fas fa-edit"></i> Edit
                                                    </button>
                                                    <UpdateDiv :division="division" :id="String(division.id)" />
                                                    <button class="btn btn-app bg-danger"
                                                        @click="destroyDivision(division.id)"
                                                        style="margin-left: 10px;">
                                                        <i class="fas fa-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <Pagination :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage"
                                    @nextPage="nextPage" @goToPage="goToPage" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
</template>

<style scoped></style>
