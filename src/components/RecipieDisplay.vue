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
import { Recipie } from '@/types/recipie.types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: "Recipie Display",
    components: {
    },
    props: {
        recipie: {
            type: Object as PropType<Recipie>,
            default: null,
            required: true
        }
    },
    setup() {
        return {};

    }
})
</script>