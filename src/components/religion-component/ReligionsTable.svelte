<script lang="ts">
    import { onMount } from "svelte";
    import type { Religion } from "../../types/religion";
    import { religions } from "../../stores/religions";
    import axios from "axios";
    import { showToast } from "../../service/toastService";

    onMount(async () => {
        const res = await fetch(
            "https://religion-caste-backend.vercel.app/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();
        religions.set(data);
    });

    const deleteReligion = async (id: string) => {
        try {
            await axios.delete(
                `https://religion-caste-backend.vercel.app/api/religions/delete-religion/${id}`,
            );
            religions.update((religionList) =>
                religionList.filter((religion) => religion._id !== id),
            );
            showToast("Religion deleted successfully", "success");
        } catch (error) {
            console.log("error deleting religion", error);
        }
    };
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
                            <button>Caste</button>
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
