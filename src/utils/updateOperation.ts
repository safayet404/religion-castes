import axios from "axios";

export const updateReligion = async (religionId: string, data: any) => {
    try {
        const response = await axios.put(`https://religion-caste-backend.vercel.app/api/religions/update-religion/${religionId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // return the response data
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};
export const updateCaste = async (casteId: string, data: any) => {
    try {
        const response = await axios.put(`https://religion-caste-backend.vercel.app/api/castes/update-caste/${casteId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // return the response data
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};