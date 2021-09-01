<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <recipie-card v-for="recipie in recipies" :key="recipie.id" :recipie="recipie" />
    </div>
</template>

<script lang="ts">
import { useStore } from '@/services/store'
import { defineComponent } from 'vue'
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
        let recipies;

        if (props.tagFilter) {
            recipies = await store.getAllRecipies();
        } else {
            recipies = await store.getAllRecipies();
        }

        return {
            recipies
        }
    }
})
</script>