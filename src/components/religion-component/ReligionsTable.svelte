<script lang="ts">
    import { onMount } from "svelte";
    import type { Religion } from "../../types/religion";
    import { religions } from "../../stores/religions";
    import { fetchReligions } from "../../utils/fetchData";
    import { deleteReligion } from "../../utils/deleteOperation";

    onMount(async () => {
        const data: Religion[] = await fetchReligions();
        religions.set(data);
    });
</script>

<section>
    <div class="container mx-auto p-4">
        <table class="min-w-full divide-y divide-[#3f00e7]">
            <thead>
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                    ></th>
                    <th
                        class="px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Name</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Description</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >isActive</th
                    >
                    <th
                        class="px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Action</th
                    >
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-[#3f00e7]">
                {#each $religions as religion}
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td class="px-6 py-3 text-left font-semibold"
                            >{religion?.name}</td
                        >
                        <td class="px-6 py-3 text-left"
                            >{religion?.description}</td
                        >
                        <td class="px-6 py-3 text-left">{religion?.isActive}</td
                        >
                        <td class="font-semibold text-sm">
                            <button>
                                <a href={`/castes/${religion?._id}`}>Caste</a>
                            </button>
                            <button>
                                <a href={`/edit/${religion?._id}`}>Edit</a>
                            </button>

                            <button
                                on:click={() => deleteReligion(religion?._id)}
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
