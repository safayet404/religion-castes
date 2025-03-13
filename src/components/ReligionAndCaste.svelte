<script lang="ts">
    import { onMount } from "svelte";
    import { religions, singleReligion } from "../stores/religions";
    import type { Religion } from "../types/religion";

    let selectedReligionId: string | null = null;
    let selectedCasteId: string | null = null;

    onMount(async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();
        religions.set(data);
        if (data.length > 0) {
            selectedReligionId = data[0]._id;
        }

        const castesData = await fetch(
            `https://religion-caste-backend.vercel.app/api/religions/single-religion/${selectedReligionId}`,
        );

        const data2: any = await castesData.json();
        console.log(data2?.castes);

        singleReligion.set(data2?.castes);
        if ($singleReligion.length > 0) {
            selectedCasteId = $singleReligion[0]?._id;
        }
    });
    console.log("data", $singleReligion);
</script>

<section>
    <div class="container mx-auto p-4">
        <h1>{selectedReligionId}</h1>
        <h1>{selectedCasteId}</h1>
        <div class="grid grid-cols-2 gap-10 justify-between">
            <div class="flex flex-col w-[50%]">
                <label for="religion">Select a Religion</label>
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
                <label for="religion">Select a Religion</label>
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
</section>
