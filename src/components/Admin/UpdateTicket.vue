<script setup>
import { onMounted } from 'vue';
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
    <div class="modal fade" :id="'updateTicket' + id">
        <div class="modal-dialog">
            <div class="modal-content bg-primary">

                <div class="modal-header">
                    <h4 class="modal-title">Update Ticket</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="col-lg-5">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-charging-station"></i></span>
                            </div>
                            <select v-model="ticket.state" :id="'state_' + id" class="form-control custom-select" required>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                            </div>
                            <textarea class="form-control" v-model="ticket.remark" :id="'remark_' + id"
                                placeholder="Enter Remark"></textarea>
                        </div>
                    </div>

                    <b>Requested By:</b>

                    <div class="mb-1 row">
                        <div class="col-lg-8">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.staffname" :id="'staffname_' + id" name="staffname"
                                    readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-users"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.ticketdiv" :id="'ticketdiv_' + id" name="ticketdiv"
                                    readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-at"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.email" :id="'email_' + id" name="email" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-exclamation-triangle"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.severity" :id="'severity_' + id" name="severity"
                                    readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-tv"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.category" :id="'category_' + id" name="category"
                                    readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-sticky-note"></i></span>
                                </div>
                                <textarea class="form-control" v-model="ticket.description" :id="'description_' + id" name="description"
                                    placeholder="No Description" readonly autocomplete="off"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-light" :id="'modalremove' + id" data-dismiss="modal"><b>Close</b></button>
                    <button @click.prevent="updateTicket(id)" class="btn btn-outline-light"><b>Save changes</b></button>
                </div>

            </div>
        </div>
    </div>
</template>