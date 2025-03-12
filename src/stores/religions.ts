import { writable } from "svelte/store";
import type { Religion } from "../types/religion";

export const religions = writable<Religion[]>([]);
