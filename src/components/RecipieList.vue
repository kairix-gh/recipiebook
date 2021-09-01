<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <recipie-card v-for="recipie in recipies" :key="recipie.id" :recipie="recipie" />
    </div>
</template>

<script lang="ts">
import { useStore } from '@/services/store'
import { defineComponent, ref, watch } from 'vue'
import RecipieCard from '@/components/RecipieCard.vue'

export default defineComponent({
    name: "RecipieList",
    components: {
        RecipieCard
    },
    props: {
        tagFilter: {
            type: String,
            default: "",
            required: false,
        }
    },
    async setup(props) {
        const store = useStore()
        let recipies = ref();


        async function getRecipies() {
            if (props.tagFilter) {
                console.log(props.tagFilter)

                recipies.value = await store.getRecipiesByTag(props.tagFilter);
            } else {
                recipies.value = await store.getAllRecipies();
            }
        }
        getRecipies();

        // Update recipies when prop changes
        watch(
            () => props.tagFilter,
            () => {
                getRecipies();
            }
        )

        return {
            recipies
        }
    }
})
</script>