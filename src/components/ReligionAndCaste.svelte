<script lang="ts">
    import { onMount } from "svelte";
    import { religions, singleReligion } from "../stores/religions";
    import type { Religion } from "../types/religion";

    let selectedReligionId: string | null = null;
    let selectedReligion: string | null = null;
    let selectedCasteId: string | null = null;
    let selectedCaste: string | null = null;

    // Fetch religions when the component is mounted
    onMount(async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();
        religions.set(data);

        if (data.length > 0) {
            selectedReligionId = data[0]._id; // Set default religion ID
            selectedReligion = data[0]?.name; // Set default religion name
        }
    });

    // Watch the selectedReligionId and update the religion name accordingly
    $: if (selectedReligionId) {
        // Find the selected religion name based on the selectedReligionId
        const selectedReligionObj = $religions.find(
            (religion) => religion._id === selectedReligionId,
        );
        if (selectedReligionObj) {
            selectedReligion = selectedReligionObj.name;
        }

        // Fetch castes based on the selected religion ID
        const fetchCastes = async () => {
            const castesData = await fetch(
                `https://religion-caste-backend.vercel.app/api/religions/single-religion/${selectedReligionId}`,
            );
            const data2: any = await castesData.json();
            console.log(data2?.castes);

            singleReligion.set(data2?.castes);

            // Set the default selected caste
            if (data2?.castes.length > 0) {
                selectedCasteId = data2?.castes[0]?._id; // Set default caste ID
                selectedCaste = data2?.castes[0]?.name; // Set default caste name
            }
        };

        fetchCastes(); // Fetch castes when the religion changes
    }

    // Watch selectedCasteId and update selectedCaste accordingly
    $: if (selectedCasteId && $singleReligion) {
        const selectedCasteObj = $singleReligion.find(
            (caste) => caste._id === selectedCasteId,
        );
        if (selectedCasteObj) {
            selectedCaste = selectedCasteObj.name;
        }
    }

    console.log("selectedReligionId", selectedReligionId);
    console.log("selectedReligion", selectedReligion);
    console.log("selectedCasteId", selectedCasteId);
    console.log("selectedCaste", selectedCaste);
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
