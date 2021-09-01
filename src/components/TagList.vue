<template>
    <div class="flex flex-col">
        <p class="font-medium mb-2">Recipie Tags:</p>
        <div class="grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-2">
            <p v-for="(tag, index) in tags" :key="index" class="px-2">
                {{ tag }}
            </p>
        </div>
    </div>
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

        const tags = await store.getAllTags();

        return {
            tags
        }
    }
})
</script>