<script lang="ts">
    import { showToast } from "../../service/toastService";

    import { religions } from "../../stores/religions";
    import type { Religion } from "../../types/religion";
    import axios from "axios";
    import { writable } from "svelte/store";
    let newReligion = {
        name: "",
        description: "",
        isActive: false,
    };

    const isLoading = writable(false);

    const addReligion = async () => {
        isLoading.set(true);
        try {
            const res = await axios.post(
                "https://religion-caste-backend.vercel.app/api/religions/create-religion",
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

                showToast("Religion Added Successfully", "success");
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
            "http://localhost:5000/api/religions/get-religions",
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
                    <button
                        type="submit"
                        class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                        disabled={$isLoading}
                    >
                        {$isLoading ? "Religion Adding ...." : "Add Religion"}
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>
