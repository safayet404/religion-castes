<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    export let id: string;
    import { castes, religions } from "../../stores/religions";
    import type { Castes, Religion } from "../../types/religion";
    import axios from "axios";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";

    $: id = $page.params.id;
    let singleReligion: any = [];
    let newCaste = { name: "", description: "", religionId: id };
    onMount(async () => {
        const res = await fetch(
            `https://religion-caste-backend.vercel.app/api/religions/single-religion/${id}`,
        );

        const data: Religion[] = await res.json();

        singleReligion = data;
        console.log("single data", singleReligion?.name);
    });

    const isLoading = writable(false);

    const addCaste = async () => {
        isLoading.set(true);
        try {
            const res = await axios.post(
                `https://religion-caste-backend.vercel.app/api/castes/create-caste`,
                newCaste,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (res.status === 200 || res.status === 201) {
                const addCaste = res.data;

                console.log("Added Religion:", addCaste);
                castes.update((currentCaste) => [...currentCaste, addCaste]);
                await fetchCastes();
                newCaste = { name: "", description: "", religionId: "" };

                goto("/religions");
                showToast("Caste Added Successfully", "success");
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

    const fetchCastes = async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/castes/get-castes",
        );

        const data: Castes[] = await res.json();

        castes.set(data);
    };
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="mt-10 font-bold text-xl">Caste Page</h1>
        <h1>
            Selected Religion {singleReligion?._id} , {singleReligion?.name}
        </h1>
        <p class="font-bold text-lg md:text-4xl mt-10">
            Caste Manager for {singleReligion?.name}
        </p>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addCaste}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Religion</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={newCaste.name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Description</label>
                    <input
                        type="text"
                        name="description"
                        bind:value={newCaste.description}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>

                <div class="flex flex-col">
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                            disabled={$isLoading}
                        >
                            {$isLoading ? "Adding Caste ...." : "Add Caste"}
                        </button>

                        <!-- <a
                            href="/religions"
                            class="bg-[#f100b7] p-2 w-full text-white text-center rounded-md"
                            >Cancel</a
                        > -->
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
