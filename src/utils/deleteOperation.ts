import axios from 'axios';
import { religions, singleReligion } from '../stores/religions';
import { showToast } from '../service/toastService';

export const deleteReligion = async (id: string) => {
    try {
        await axios.delete(
            `https://religion-caste-backend.vercel.app/api/religions/delete-religion/${id}`,
        );

        religions.update((religionList) =>
            religionList.filter((religion) => religion._id !== id),
        );

        showToast("Religion deleted successfully", "success");
    } catch (error) {
        console.error("Error deleting religion:", error);
        showToast("Error deleting religion", "error");
    }
};

export const deleteCaste = async (id: string) => {
    try {
        await axios.delete(
            `https://religion-caste-backend.vercel.app/api/castes/delete-caste/${id}`,
        );
        singleReligion.update((casteList) =>
            casteList.filter((caste) => caste._id !== id),
        );
        showToast("Caste deleted successfully", "success");
    } catch (error) {
        console.log("error deleting caste", error);
    }
};
