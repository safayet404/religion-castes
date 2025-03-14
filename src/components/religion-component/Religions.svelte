<script lang="ts">
    import { onMount } from "svelte";
    import { errorMessage } from "../../stores/religions";
    import ReligionsTable from "./ReligionsTable.svelte";
    import { loadReligions } from "../religion and caste/religionAndCasteFetch";

    let localErrorMessage: string | null = null;

    onMount(() => {
        loadReligions();
    });

    $: localErrorMessage = $errorMessage;
</script>

<section>
    {#if localErrorMessage}
        <div class="text-red-500">{localErrorMessage}</div>
    {/if}
    <ReligionsTable />
</section>
