<template>
    <router-link :to="{ name: 'ViewRecipie', params: { id: recipie.id} }" class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-lg">
        <div class="border min-h-[10rem] px-4 py-2 rounded-lg shadow select-none">
            <p class="text-lg font-medium border-b mb-2">{{ recipie.name }}</p>
            <div class="flex space-x-2">
                <p v-for="(tag, index) in recipie.tags" :key="index" class="bg-yellow-100 px-2 py-1 rounded-lg text-gray-700 select-none">
                    {{ tag }}
                </p>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { Recipie } from '@/types/recipie.types'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    name: "RecipieCard",
    props: {
        recipie: {
            type: Object as PropType<Recipie>,
            required: true,
        }
    },
    setup() {
        return {}
    }
})
</script>