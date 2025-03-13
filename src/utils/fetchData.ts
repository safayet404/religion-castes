// utils/religionUtils.ts
export const fetchReligions = async () => {
    try {
        const res = await fetch("https://religion-caste-backend.vercel.app/api/religions/get-religions");
        const data = await res.json();
        return data; // Return the fetched religions data
    } catch (error) {
        console.error("Error fetching religions:", error);
        return [];
    }
};

export const fetchCastesByReligion = async (religionId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.vercel.app/api/religions/single-religion/${religionId}`);
        const data = await res.json();
        return data?.castes || []; // Return castes or empty array if no castes found
    } catch (error) {
        console.error("Error fetching castes:", error);
        return [];
    }
};
export const fetchSingleReligion = async (religionId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.vercel.app/api/religions/single-religion/${religionId}`);
        const data = await res.json();
        return data // Return castes or empty array if no castes found
    } catch (error) {
        console.error("Error fetching castes:", error);
        return [];
    }
};
export const fetchSngleCaste = async (casteId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.vercel.app/api/castes/single-caste/${casteId}`);
        const data = await res.json();
        return data // Return castes or empty array if no castes found
    } catch (error) {
        console.error("Error fetching castes:", error);
        return [];
    }
};
