<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipie in recipies" :key="recipie.id" class="border min-h-[14rem]">
            {{ recipie.name }}
            <div class="flex space-x-2">
                <p v-for="(tag, index) in recipie.tags" :key="index" class="bg-yellow-100 px-2 py-1 rounded-lg text-gray-700 select-none">
                    {{ tag }}
                </p>
            </div>
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

        const recipies = await store.getAllRecipies();

        return {
            recipies
        }
    }
})
</script>