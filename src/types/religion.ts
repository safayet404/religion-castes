
export interface Caste {
    _id: string;
    name: string;
    religionId: string;
    description: string,
    isActive: boolean;
}

export interface Religion {
    _id: string;
    name: string;
    description: string,
    castes: Caste[]; // ✅ List of castes inside religion
    isActive: boolean;
}
