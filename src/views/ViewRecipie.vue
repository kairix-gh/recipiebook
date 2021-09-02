<template>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:space-x-4">
            <Suspense>
                <template #default>
                    <recipie-display :tagFilter="tag"/>
                </template>

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
    </div>


</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import RecipieDisplay from "@/components/RecipieDisplay.vue"
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "ViewRecipie",
    components: {
        RecipieDisplay,
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