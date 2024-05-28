<script setup>
import { reactive } from 'vue';
import useDivisions from '@/composables/divisions';

const { storeDivision, errors } = useDivisions();

const form = reactive({
    name: "",
    code: "",
    head: "",
    duty: "",
})
</script>

<template>
    <div class="col-sm-6">
        <div class="breadcrumb float-sm-right">
            <button type="button" class="btn btn-block btn-warning btn-lg" data-toggle="modal"
                data-target="#modal-primary"><i class="fa fa-plus-circle mr-1"></i>
                <b>Create Division</b>
            </button>
        </div>
    </div>

    <div class="modal fade" id="modal-primary" data-backdrop="static" data-keyboard="false"> <!--Create Modal-->
        <div class="modal-dialog">
            <div class="modal-content bg-warning">
                <div class="modal-header">

                    <h4 class="modal-title">Create Division</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" id="name" v-model="form.name" class="form-control" placeholder="Enter Division Name" autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-archive"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" id="code" v-model="form.code" class="form-control" placeholder="Enter Division Code" autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-keyboard"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" id="head" v-model="form.head" class="form-control" placeholder="Enter Division Head" autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user-tie"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                        </div>
                        <textarea id="duty" v-model="form.duty" class="form-control" placeholder="Enter Duty"></textarea>
                    </div>

                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-dark" id="modalremove" data-dismiss="modal"><b>Close</b></button>
                        <button @click.prevet="storeDivision(form)" class="btn btn-outline-dark"><b>Create</b></button>
                    </div>

                </div>
            </div>
        </div>
    </div> <!--End Modal-->


</template>