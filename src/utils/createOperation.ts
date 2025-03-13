import axios from "axios";

export const createReligion = async (data: any) => {
    try {
        const response = await axios.post("https://religion-caste-backend.vercel.app/api/religions/create-religion", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};
export const createCaste = async (data: any) => {
    try {
        const response = await axios.post("https://religion-caste-backend.vercel.app/api/castes/create-caste", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};
