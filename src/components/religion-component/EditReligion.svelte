<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    export let id: string;
    import { religions } from "../../stores/religions";
    import type { Religion } from "../../types/religion";
    import axios from "axios";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";

    $: id = $page.params.id;
    let singleReligion: any = [];
    let newReligion = { name: "", description: "", isActive: false };
    onMount(async () => {
        const res = await fetch(
            `https://religion-caste-backend.vercel.app/api/religions/single-religion/${id}`,
        );

        const data: Religion[] = await res.json();

        singleReligion = data;
        console.log("single data", singleReligion?.name);
    });

    $: if (singleReligion) {
        newReligion = {
            name: singleReligion.name,
            description: singleReligion.description,
            isActive: singleReligion.isActive,
        };
    }

    const isLoading = writable(false);

    const addReligion = async () => {
        isLoading.set(true);
        try {
            const res = await axios.put(
                `https://religion-caste-backend.vercel.app/api/religions/update-religion/${id}`,
                newReligion,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (res.status === 200 || res.status === 201) {
                const addedReligion = res.data;

                console.log("Added Religion:", addedReligion);
                religions.update((currentReligions) => [
                    ...currentReligions,

                    addedReligion,
                ]);
                await fetchReligions();
                newReligion = { name: "", description: "", isActive: false };

                goto("/religions");
                showToast("Religion Update Successfully", "success");
            } else {
                console.log("Unexpected response status:", res.status);
            }
        } catch (error: any) {
            console.error(
                "Error adding religion:",
                error.response ? error.response.data : error,
            );
        } finally {
            isLoading.set(false);
        }
    };

    const fetchReligions = async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();

        religions.set(data);
    };
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Religion Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addReligion}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Religion</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={newReligion.name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Description</label>
                    <input
                        type="text"
                        name="description"
                        bind:value={newReligion.description}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Active</label>
                    <input
                        type="checkbox"
                        bind:checked={newReligion.isActive}
                        class="w-5 bg-[#3f00e7] h-5"
                    />
                </div>
                <div class="flex flex-col">
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                            disabled={$isLoading}
                        >
                            {$isLoading ? "Saving ...." : "Save"}
                        </button>

                        <a
                            href="/religions"
                            class="bg-[#f100b7] p-2 w-full text-white text-center rounded-md"
                            >Cancel</a
                        >
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
