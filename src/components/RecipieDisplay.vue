<template>
    <div class="flex flex-col w-full">
        <h1 class="text-center text-lg font-medium italic mb-4">{{ recipie.name }}</h1>

        <!-- Tags -->
        <div class="flex items-start space-x-6 my-2">
            <p v-for="(tag, index) in recipie.tags" :key="index" class="bg-yellow-100 px-2 py-1 rounded-lg text-gray-700 select-none text-xs uppercase">
                {{ tag }}
            </p>
        </div>

        <!-- Recipie Stats -->
        <div class="flex flex-col space-y-4 mb-6">
            <p class="font-medium">Servings: <span class="font-normal">{{ recipie.servings }}</span></p>

            <div class="">
                <p class="font-medium">Cook Time:</p>
                <div class="flex flex-col md:flex-row md:space-x-8">
                        <div v-for="(prepStep, index) in recipie.timeToMake" :key="index" class="flex md:flex-col">
                            <p class="md:text-center">{{ prepStep.name }}<span class="md:hidden">:</span></p>
                            <p class="ml-2 md:ml-0 md:text-center text-gray-500">{{ prepStep.duration }} min.</p>
                        </div>
                </div>
            </div>
        </div>

        <!-- Macros -->
        <p class="font-medium">Nutrition:</p>
        <div class="flex space-x-8 mb-6">
            <p>Calories: <span class="text-gray-500">{{ recipie.nutrition.calories ?? 'N/A' }}</span></p>
            <p>Protein: <span class="text-gray-500">{{ recipie.nutrition.macros.protein ?? 'N/A' }}</span></p>
            <p>Carbs: <span class="text-gray-500">{{ recipie.nutrition.macros.carbs ?? 'N/A' }}</span></p>
            <p>Fats: <span class="text-gray-500">{{ recipie.nutrition.macros.fat ?? 'N/A' }}</span></p>
        </div>

        <!-- Ingredients -->
        <div class="mb-6">
            <p class="font-medium">Ingredients:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-4">
                <div v-for="(ingredient, index) in recipie.ingredients" :key="index">
                    <p>{{ ingredient.amount }} {{ ingredient.measurement}} - {{ ingredient.name }}</p>
                </div>
            </div>
        </div>

        <!-- Notes -->
        <div class="mb-6" v-if="recipie.notes.length > 0">
            <p class="border-b mb-2">Notes</p>
            <ul class="list-disc ml-8">
                <li v-for="(note, index) in recipie.notes" :key="index">{{ note }}</li>
            </ul>
        </div>

        <!-- Cooking Steps -->
        <div class="mb-6">
            <div v-for="(step, index) in recipie.steps" :key="index" class="mb-6">
                <p class="border-b mb-2">{{ step.name }}</p>
                <ol class="list-decimal ml-8">
                    <li v-for="(task, index) in step.tasks" :key="index">{{ task }}</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/services/store';
import { Recipie } from '@/types/recipie.types'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "Recipie Display",
    components: {
    },
    async setup() {
        const route = useRoute();
        const store = useStore();

        const recipie = await store.getRecipie(route.params.id as string) as Recipie;

        // Total Cook time
        const totalCookTime = computed(() => {
            return recipie.timeToMake.map(e => e.duration).reduce((a, b) => a + b);
        })

        return {
            recipie,
            totalCookTime
        };

    }
})
</script>