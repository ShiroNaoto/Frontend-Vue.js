import { ref, inject } from "vue";
import axios from "axios"

// axios.defaults.baseURL = "http://rest-api.noot/api/v1/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useUsers() {

    const swal = inject('$swal');
    const showMessage = (icon, title, text, html) => swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });
    const users = ref([]);
    const user = ref([]);
    const errors = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const totalUsers = ref(0);
    const searchQuery = ref("");

    const getUsers = async (page = 1, search = "") => {
        const response = await axios.get(`users?page=${page}&search=${search}`);
        users.value = response.data.data;
        currentPage.value = response.data.meta.current_page;
        totalPages.value = response.data.meta.last_page;
        totalUsers.value = response.data.meta.total;
    };

    const getUser = async (id) => {
        const response = await axios.get("users/" + id);
        user.value = response.data.data;
    };

    const storeUser = async (data) => {
        const modalRemoveButton = document.getElementById('modalremove');
        try {
            await axios.post("users", data);
            showMessage('success', 'Succesfully Registered!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const updateUser = async (id) => {
        const modalRemoveButton = document.getElementById(`modalremove${id}`);
        try {
            await axios.put("users/" + id, user.value);
            showMessage('success', 'User Updated!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const destroyUser = async (id) => {
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
                await axios.delete("users/" + id);
                await getUsers();
                swal.fire("Deleted!", "The user has been deleted.", "success");
            }
        })
    };

    const nextPage = async () => {
        if (currentPage.value < totalPages.value) {
            await getUsers(currentPage.value + 1);
        }
    };

    const prevPage = async () => {
        if (currentPage.value > 1) {
            await getUsers(currentPage.value - 1);
        }
    };

    const goToPage = async (page) => {
        if (page >= 1 && page <= totalPages.value) {
            await getUsers(page);
        }
    };

    return {
        user,
        users,
        getUser,
        getUsers,
        storeUser,
        updateUser,
        destroyUser,
        errors,
        currentPage,
        totalPages,
        totalUsers,
        nextPage,
        prevPage,
        goToPage,
        searchQuery
    };
}