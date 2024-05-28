import { ref, inject } from "vue";
import axios from "axios"

// axios.defaults.baseURL = "http://rest-api.noot/api/v1/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useDivisions() {

    const swal = inject('$swal');
    const showMessage = (icon, title, text, html) => swal.fire({ icon, title, text, html, showConfirmButton: false, timer: 2500 });
    const divisions = ref([]);
    const division = ref([]);
    const errors = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const totalDiv = ref(0);
    const searchQuery = ref("");


    const getDivPage = async (page = 1, search = "") => {
        const response = await axios.get(`divisions?page=${page}&search=${search}`);
        divisions.value = response.data.data;
        currentPage.value = response.data.meta.current_page;
        totalPages.value = response.data.meta.last_page;
        totalDiv.value = response.data.meta.total;
    };

    const getDivisions = async () => {
        const response = await axios.get("divselect");
        divisions.value = response.data.data;
    };

    const getDivision = async (id) => {
        const response = await axios.get("divisions/" + id);
        division.value = response.data.data;
    };

    const storeDivision = async (data) => {
        const modalRemoveButton = document.getElementById('modalremove');
        try {
            await axios.post("divisions", data);
            showMessage('success', 'Succesfully Created!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const updateDivision = async (id) => {
        const modalRemoveButton = document.getElementById(`modalremove${id}`);
        try {
            await axios.put("divisions/" + id, division.value);
            showMessage('success', 'Succesfully Updated!');
            modalRemoveButton.click();
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.field) {
                const { message } = error.response.data;
                showMessage('error', 'Validation Error', message);
            }
        }
    };

    const destroyDivision = async (id) => {
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
                await axios.delete("divisions/" + id);
                await getDivPage();
                swal.fire("Deleted!", "The Division has been deleted.", "success");
            }
        })
    };

    const nextPage = async () => {
        if (currentPage.value < totalPages.value) {
            await getDivPage(currentPage.value + 1);
        }
    };

    const prevPage = async () => {
        if (currentPage.value > 1) {
            await getDivPage(currentPage.value - 1);
        }
    };

    const goToPage = async (page) => {
        if (page >= 1 && page <= totalPages.value) {
            await getDivPage(page);
        }
    };

    return {
        division,
        divisions,
        getDivision,
        getDivisions,
        getDivPage,
        storeDivision,
        updateDivision,
        destroyDivision,
        errors,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        totalDiv,
        searchQuery
    };
}