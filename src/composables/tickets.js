import { ref, inject } from "vue";
import axios from "axios"

// axios.defaults.baseURL = "http://rest-api.noot/api/v1/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useTickets() {

    const swal = inject('$swal');
    const showMessage = (icon, title, text, html) => swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });
    const tickets = ref([]);
    const ticket = ref([]);
    const errors = ref([]);
    const searchQuery = ref("");

    const getTickets = async (search = "") => {
        const response = await axios.get(`tickets?search=${search}`);
        tickets.value = response.data.data;
    };

    const getTicket = async (id) => {
        const response = await axios.get("tickets/" + id);
        ticket.value = response.data.data;
    };

    const storeTicket = async (data) => {
        const modalRemoveButton = document.getElementById('modalremove');
        try {
            await axios.post("tickets", data);
            showMessage('success', 'Succesfully Requested');
            modalRemoveButton.click();
            window.location.reload();

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const updateTicket = async (id) => {
        const modalRemoveButton = document.getElementById(`modalremove${id}`);
        try {

            await axios.put("tickets/" + id, ticket.value);
            showMessage('success', 'Ticket Updated!');
            modalRemoveButton.click();
            await getTickets();

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const destroyTicket = async (id) => {
        swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete("tickets/" + id);
                await getTickets();
                swal.fire("Deleted!", "The Ticket Request has been deleted.", "success");
            }
        })
    };

    return {
        ticket,
        tickets,
        getTicket,
        getTickets,
        storeTicket,
        updateTicket,
        destroyTicket,
        errors,
        searchQuery
    };
}