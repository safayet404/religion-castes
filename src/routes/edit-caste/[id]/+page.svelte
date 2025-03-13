<script lang="ts">
    import type { PageData } from "./$types"; // Import PageData type
    import EditCaste from "../../../components/caste-component/EditCaste.svelte";

    export let data: PageData; // Type the data prop
</script>

<EditCaste id={data?.id as string} />
