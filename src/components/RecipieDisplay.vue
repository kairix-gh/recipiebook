<template>
    <div v-if="recipie.name">
        <p>{{ recipie.name }}</p>
        <p>{{ recipie.servings }}</p>
        <p>{{ recipie.ingredients }}</p>
    </div>
    <div v-else>
        <p>Select a recipie</p>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/services/store';
import { Recipie } from '@/types/recipie.types'
import { defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "Recipie Display",
    components: {
    },
    async setup() {
        const route = useRoute();
        const store = useStore();

        const recipie = await store.getRecipie(route.params.id as string)

        return {
            recipie
        };

    }
})
</script>