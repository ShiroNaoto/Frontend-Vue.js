<script setup>
import { reactive, onMounted } from 'vue';
import useTickets from '@/composables/tickets';

const { ticket, getTicket, updateTicket, errors } = useTickets();

const props = defineProps({
    id: {
        required: true,
        type: String,
    },
});

onMounted(() => {
    getTicket(props.id);
});
</script>

<template>
    <div class="modal fade" :id="'editTicket' + id">
        <div class="modal-dialog">
            <div class="modal-content bg-gradient-success">

                <div class="modal-header">
                    <h4 class="modal-title text-white" id="modal-primary">Edit Ticket</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <!--PREDETERMINED STATE-->
                    <div class="input-group mb-2" style="display: none;">
                        <select v-model="ticket.state" :id="'state' + id" class="form-control custom-select" required>
                            <option selected>Pending</option>
                        </select>
                    </div>

                    <!--PREDETERMINED HIDDEN USER ID-->
                    <div class="input-group mb-2" style="display: none;">
                        <input type="text" v-model="ticket.user_id" :id="'user_id' + id" class="form-control" readonly>
                    </div>

                    <div class="input-group mb-2">
                        <select v-model="ticket.severity" :id="'severity' + id" class="form-control custom-select" required>
                            <option value="" disabled selected>Select Severity</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div class="input-group mb-2">
                        <select v-model="ticket.category" :id="'category' + id" class="form-control custom-select" required>
                            <option value="" disabled selected>Select Category</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Website">Website</option>
                            <option value="Network">Network</option>
                        </select>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" v-model="ticket.description" :id="'description' + id" class="form-control"
                            required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-briefcase"></span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-light" data-dismiss="modal"
                            id="createTicketClose">Close</button>
                        <button type="button" @click.prevent="updateTicket(id)" class="btn btn-outline-light">Update
                            Request</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
