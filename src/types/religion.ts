export interface Religion {

    _id: string
    name: string,
    description: string,
    castes: any[];
    isActive: boolean
}
export interface Castes {

    _id: string
    name: string,
    description: string,
    religion: Religion,
    castes: Religion
}