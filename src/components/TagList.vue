<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {{ tags }}
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