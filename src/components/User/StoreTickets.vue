<script setup>
import { reactive, onMounted } from 'vue';
import useTickets from '@/composables/tickets';

const { storeTicket, errors } = useTickets();

const userData = reactive({
    user: JSON.parse(localStorage.getItem('user')) || {}
});

const form = reactive({
    state: "Pending",
    user_id: "",
    staffname: "",
    email: "",
    ticketdiv: "",

    category: "",
    severity: "",
    description: "",
    remark: "",
});

onMounted(() => {
    form.user_id = userData.user.id || "";
    form.staffname = userData.user.name || "";
    form.email = userData.user.email || "";
    form.ticketdiv = userData.user.division_id || "";
});
</script>

<template>
    <div class="col-sm-6">
        <div class="breadcrumb float-sm-right">
            <button type="button" class="btn btn-block btn-warning btn-lg" data-toggle="modal"
                data-target="#modal-primary"><i class="fa fa-plus-circle mr-1"></i>
                <b>Create Ticket</b>
            </button>
        </div>
    </div>

    <div class="modal fade" id="modal-primary" tabindex="-1" role="dialog" aria-labelledby="modal-primary"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-gradient-warning">

                <div class="modal-header">
                    <h4 class="modal-title text-white" id="modal-primary">Create Ticket</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <!--PREDETERMINED STATE-->
                    <div class="input-group mb-2" style="display: none;">
                        <select v-model="form.state" id="state" class="form-control custom-select" required>
                            <option selected>Pending</option>
                        </select>
                    </div>

                    <!--PREDETERMINED HIDDEN USER ID-->
                    <div class="input-group mb-2" style="display: none;">
                        <input type="text" v-model="form.user_id" id="user_id" class="form-control" readonly>
                    </div>

                    <div class="input-group mb-2">
                        <select v-model="form.severity" id="severity" class="form-control custom-select" required>
                            <option value="" disabled selected>Select Severity</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div class="input-group mb-2">
                        <select v-model="form.category" id="category" class="form-control custom-select" required>
                            <option value="" disabled selected>Select Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Website">Website</option>
                            <option value="Network">Network</option>
                        </select>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" v-model="form.description" id="description" class="form-control"
                            placeholder="Enter Request" required autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-briefcase"></span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-light" data-dismiss="modal"
                            id="modalremove">Close</button>
                        <button type="button" @click.prevent="storeTicket(form)" class="btn btn-outline-light">Create
                            Request</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
