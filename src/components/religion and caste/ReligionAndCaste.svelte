<script lang="ts">
    import ReligionSelector from "./ReligionSelector.svelte";
    import CasteSelector from "./CasteSelector.svelte";
    import {
        errorMessage,
        religions,
        selectedCasteId,
        selectedReligionId,
        singleReligion,
    } from "../../stores/religions";
    import { onDestroy } from "svelte";
    let currentErrorMessage: string | null = null;

    const unsubscribe = errorMessage.subscribe((value) => {
        currentErrorMessage = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    let selectedReligionName: string | null = null;
    let selectedCasteName: string | null = null;

    $: {
        const selectedReligion = $religions.find(
            (r) => r._id === $selectedReligionId,
        );

        selectedReligionName = selectedReligion ? selectedReligion.name : null;
    }

    $: {
        const selectedCaste = $singleReligion.find(
            (c) => c._id === $selectedCasteId,
        );

        selectedCasteName = selectedCaste ? selectedCaste.name : null;
    }
</script>

<section class="mt-5 container mx-auto">
    <div class="mx-auto px-10 py-5">
        {#if currentErrorMessage}
            <div class="text-red-500">{currentErrorMessage}</div>
        {/if}

        <div class="grid grid-cols-2 bg-[#14646f] p-10 rounded-md">
            <ReligionSelector />
            <CasteSelector />
        </div>

        <div class="mt-4">
            <h2 class="text-lg font-bold">Selected Religion:</h2>

            <p>Religion Name: {selectedReligionName || "None selected"}</p>

            <p>Religion ID: {$selectedReligionId || "None selected"}</p>
        </div>

        <div class="mt-4">
            <h2 class="text-lg font-bold">Selected Caste:</h2>

            <p>Caste Name: {selectedCasteName || "None selected"}</p>

            <p>Caste ID: {$selectedCasteId || "None selected"}</p>
        </div>
    </div>
</section>
