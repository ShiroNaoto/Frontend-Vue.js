<script setup>
import { onMounted } from 'vue';
import useTickets from '@/composables/tickets';

const { ticket, getTicket, errors } = useTickets();

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
    <div class="modal fade" :id="'viewTicket' + id">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">View Ticket</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="col-lg-6">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-charging-station"></i></span>
                            </div>
                            <input type="text" v-model="ticket.state" class="form-control" name="state" readonly autocomplete="off">
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                            </div>
                            <textarea class="form-control" v-model="ticket.remark" name="remark" placeholder="No Remark" readonly autocomplete="off"></textarea>
                        </div>
                    </div>

                    <p>Requested By:</p>

                    <div class="mb-1 row">
                        <div class="col-lg-8">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.staffname" name="staffname" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-users"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.ticketdiv" name="ticketdiv" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-at"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.email" name="email" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-exclamation-triangle"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.severity" name="severity" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-tv"></i></span>
                                </div>
                                <input type="text" class="form-control" v-model="ticket.category" name="category" readonly autocomplete="off">
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-sticky-note"></i></span>
                                </div>
                                <textarea class="form-control" v-model="ticket.description" name="description" placeholder="No Description"
                                    readonly autocomplete="off"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>
</template>