<script lang="ts">
    import { onMount } from "svelte";
    import type { Religion } from "../../types/religion";
    import { religions } from "../../stores/religions";

    onMount(async () => {
        const res = await fetch(
            "http://localhost:5000/api/religions/get-religions",
        );

        const data: Religion[] = await res.json();
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
                            <button>Case</button>
                            <button>Edit</button>
                            <button>Delete</button>
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
