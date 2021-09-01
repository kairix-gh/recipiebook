<template>
    <h1 class="mb-6 text-3xl text-center italic">Recipies</h1>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:space-x-4">
        <div class="mb-6">
            <Suspense>
                <template #default>
                    <tag-list/>
                </template>

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </div>

        <div class="flex-grow max-w-[80%]">
            <Suspense>
                <template #default>
                    <recipie-list/>
                </template>

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </div>
    </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecipieList from "@/components/RecipieList.vue"
import TagList from "@/components/TagList.vue"

export default defineComponent({
    name: "ViewAllRecipies",
    components: {
        RecipieList,
        TagList
    },
    setup() {
        return {
        }
    }
})
</script>