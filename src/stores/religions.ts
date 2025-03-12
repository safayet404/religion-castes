import { writable } from "svelte/store";
import type { Castes, Religion } from "../types/religion";

export const religions = writable<Religion[]>([]);
export const singleReligion = writable<Religion[]>([]);
export const castes = writable<Castes[]>([]);
