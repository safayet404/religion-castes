<script lang="ts">
    import { onMount } from "svelte";
    import { religions, singleReligion } from "../stores/religions";
    import type { Religion } from "../types/religion";
    import { fetchCastesByReligion, fetchReligions } from "../utils/fetchData";

    let selectedReligionId: string | null = null;
    let selectedReligion: string | null = null;
    let selectedCasteId: string | null = null;
    let selectedCaste: string | null = null;

    onMount(async () => {
        // Fetch religions
        const data: Religion[] = await fetchReligions();
        religions.set(data);

        if (data.length > 0) {
            selectedReligionId = data[0]._id;
            selectedReligion = data[0]?.name;
        }

        // Ensure selectedReligionId is not null before fetching castes
        if (selectedReligionId) {
            const castesData = await fetchCastesByReligion(selectedReligionId);
            singleReligion.set(castesData);

            if (castesData.length > 0) {
                selectedCasteId = castesData[0]._id;
                selectedCaste = castesData[0].name;
            }
        }
    });

    // Fetch castes whenever selectedReligionId changes (with null check)
    $: if (selectedReligionId !== null) {
        const fetchCastes = async () => {
            // Type assertion to tell TypeScript that selectedReligionId is definitely a string here
            const castesData = await fetchCastesByReligion(
                selectedReligionId as string,
            );
            singleReligion.set(castesData);

            if (castesData.length > 0) {
                selectedCasteId = castesData[0]._id;
                selectedCaste = castesData[0].name;
            }
        };

        fetchCastes();
    }
</script>

<section class="mt-5 container mx-auto">
    <div class="mx-auto px-10 py-5 rounded-md bg-[#14646f]">
        <div class="grid grid-cols-2 gap-10 justify-between mt-10 mb-10">
            <div class="flex flex-col w-[50%]">
                <label for="religion" class="text-yellow-50"
                    >Select a Religion</label
                >
                <select
                    class="mt-2 p-2 border rounded-md"
                    bind:value={selectedReligionId}
                >
                    {#each $religions as religion}
                        <option value={religion?._id}>{religion?.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col w-[50%]">
                <label for="caste" class="text-yellow-50">Select a Caste</label>
                <select
                    class="mt-2 p-2 border rounded-md"
                    bind:value={selectedCasteId}
                >
                    {#each $singleReligion as caste}
                        <option value={caste?._id}>{caste?.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <div class="mt-10">
        <h1>Selected Religion:</h1>
        <h1>Religion Name: {selectedReligion}</h1>
        <h1>Religion ID: {selectedReligionId}</h1>
        <h1>Caste Name: {selectedCaste}</h1>
        <h1>Caste ID: {selectedCasteId}</h1>
    </div>
</section>
