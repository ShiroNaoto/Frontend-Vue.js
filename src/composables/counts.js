import { ref } from "vue";
import axios from "axios";

// axios.defaults.baseURL = "http://rest-api.noot/api/v1/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

export default function useCounts() {
    const counts = ref({});
    const errors = ref(null);

    const getCounts = async () => {
        try {
            const response = await axios.get("counts");
            counts.value = response.data;
        } catch (error) {
            errors.value = error.message;
        }
    };

    return {
        counts,
        getCounts,
        errors,
    };
}
