<template>
    <p>Here is data:</p>
    <p>{{ recipies }}</p>
</template>

<script lang="ts">
import { useStore } from '@/services/store'
import { defineComponent } from 'vue'
export default defineComponent({
    name: "",
    components: {
    },
    async setup() {
        const store = useStore()

        const recipies = await store.getAllRecipies();

        return {
            recipies
        }
    }
})
</script>