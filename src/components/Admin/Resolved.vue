<script setup>
import useTickets from "@/composables/tickets";
import { computed, onMounted, ref } from "vue";
import PaginationCS from "@/components/PaginationCS.vue";
import UpdateTickets from "@/components/Admin/UpdateTicket.vue";


const { tickets, getTickets, destroyTicket, searchQuery } = useTickets();
const currentPage = ref(1);
const pageSize = ref(5);

onMounted(() => {
    getTickets();
});

const resolvedTickets = computed(() => tickets.value.filter(ticket => ticket.state === 'Resolved'));
const totalPages = computed(() => Math.ceil(resolvedTickets.value.length / pageSize.value));

const paginatedresolvedTickets = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return resolvedTickets.value.slice(start, end);
});

function handleChangePage(page) {
    currentPage.value = page;
}

const searchUsers = () => {
    getTickets(searchQuery.value);
};
</script>

<script>
export default {
    methods: {
        getBadgeClass(severity) {
            switch (severity) {
                case 'Critical':
                    return 'badge-danger';
                case 'High':
                    return 'badge-warning';
                case 'Medium':
                    return 'badge-info';
                case 'Low':
                    return 'badge-success';
                default:
                    return 'badge-secondary';
            }
        },
        getStatusBadge(state) {
            switch (state) {
                case 'Pending':
                    return 'badge-danger';
                case 'Processing':
                    return 'badge-warning';
                case 'Resolved':
                    return 'badge-success';
            }
        }
    }
};
</script>

<template>
    <div class="card-body bg-gradient-dark">
        <div class="mb-4 input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-search fa-fw"></i></span>
            </div>
            <input type="text" name="search" class="form-control" placeholder="e.g: John Doe - Press Enter to Search! "
                v-model="searchQuery" @keyup.enter="searchUsers">
        </div>
        <table id="table1" class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Staffname</th>
                    <th scope="col">State</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ticket Division</th>
                    <th scope="col">Severity</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedresolvedTickets.length === 0">
                    <td colspan="7">No tickets available</td>
                </tr>
                <tr v-else v-for="ticket in paginatedresolvedTickets" :key="ticket.id">
                    <td>{{ ticket.staffname }}</td>
                    <td class="text-center sorting_1">
                        <span :class="['right', 'badge', 'p-2', getStatusBadge(ticket.state)]">
                            {{ ticket.state }}
                        </span>
                    </td>
                    <td>{{ ticket.email }}</td>
                    <td>{{ ticket.ticketdiv }}</td>
                    <td class="text-center sorting_1">
                        <span :class="['right', 'badge', 'p-2', getBadgeClass(ticket.severity)]">
                            {{ ticket.severity }}
                        </span>
                    </td>
                    <td>{{ ticket.description }}</td>
                    <td class="d-flex justify-content-center align-items-center">
                        <div class="btn-group">
                            <a class="btn btn-app bg-success" :data-target="'#updateTicket' + ticket.id"
                                data-toggle="modal" style="margin-left: 10px;">
                                <i class="fas fa-clipboard-check"></i> Update
                            </a>
                            <UpdateTickets :ticket="ticket" :id="String(ticket.id)" />

                            <button class="btn btn-app bg-danger" @click="destroyTicket(ticket.id)"
                                style="margin-left: 10px;">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <PaginationCS :currentPage="currentPage" :totalPages="totalPages" @changePage="handleChangePage" />
    </div>
</template>