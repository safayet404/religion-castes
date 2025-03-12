<script lang="ts">
    import EditReligion from "../../../components/religion-component/EditReligion.svelte";
    import type { PageData } from "./$types"; // Import PageData type

    export let data: PageData; // Type the data prop
</script>

<EditReligion id={data.id as string} />
