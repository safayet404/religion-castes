<script lang="ts">
    import { onMount } from "svelte";
    import type { Religion } from "../../types/religion";
    import { religions, singleReligion } from "../../stores/religions";

    import { page } from "$app/stores";
    import { fetchCastesByReligion } from "../../utils/fetchData";
    import { deleteCaste } from "../../utils/deleteOperation";
    export let id: string;
    $: id = $page.params.id;

    onMount(async () => {
        const data: any = await fetchCastesByReligion(id);

        singleReligion.set(data);
    });

    onMount(async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();

        religions.set(data);
    });
</script>

<section>
    <div class="container mx-auto p-4">
        <table class="min-w-full table-fixed divide-y divide-[#f87171]">
            <thead>
                <tr>
                    <th
                        class="w-[10%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                    ></th>
                    <th
                        class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Name</th
                    >
                    <th
                        class="w-[40%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Description</th
                    >
                    <th
                        class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Action</th
                    >
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-[#f87171]">
                {#each $singleReligion as caste}
                    <tr>
                        <td class="w-[10%] px-6 py-3"
                            ><input type="checkbox" /></td
                        >
                        <td class="w-[25%] px-6 py-3 font-semibold"
                            >{caste?.name}</td
                        >
                        <td class="w-[45%] px-6 py-3">{caste?.description}</td>
                        <td class="w-[25%] px-6 py-3 font-semibold text-sm">
                            <button>
                                <a href={`/edit-caste/${id}/${caste._id}`}
                                    >Edit</a
                                >
                            </button>
                            <button on:click={() => deleteCaste(caste?._id)}
                                >Delete</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>

<style>
    td button {
        background-color: #ef4c53;
        color: white;
        padding: 4px;
        border-radius: 4px;
    }
</style>
