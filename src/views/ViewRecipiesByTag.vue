<template>
    <h1 class="mb-6 text-3xl text-center italic">Recipies tagged with {{ tag }}</h1>
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
                    <recipie-list :tagFilter="tag"/>
                </template>

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </div>
    </div>


</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import RecipieList from "@/components/RecipieList.vue"
import TagList from "@/components/TagList.vue"
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "ViewRecipiesByTag",
    components: {
        RecipieList,
        TagList
    },
    setup() {
        const route = useRoute();
        const tag = ref(route.params.tag);

        // When our route params change, update prop which is then propagated downward
        watch(
            () => route.params.tag,
            async newTag => {
                if (newTag) {
                    tag.value = newTag
                }
            }
        )

        return {
            tag
        }
    }
})
</script>