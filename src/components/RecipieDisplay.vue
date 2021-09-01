<template>
    <div class="flex flex-col">
        <h1>{{ recipie.name }}</h1>

        <!-- Tags -->
        <div class="flex space-x-6">
            <p v-for="(tag, index) in recipie.tags" :key="index" class="bg-yellow-100 px-2 py-1 rounded-lg text-gray-700 select-none">
                {{ tag }}
            </p>
        </div>

        <!-- Recipie Stats -->
        <div class="flex items-center justify-between">
            <p>Servings: <span>{{ recipie.servings }}</span></p>
            <div class="flex flex-col">
                <p v-for="(prepStep, index) in recipie.timeToMake" :key="index">{{ prepStep.name }}: <span>{{ prepStep.duration }} minutes</span></p>
                <p>Total: {{ totalCookTime }} minutes</p>
            </div>
        </div>

        <!-- Macros -->
        <div class="flex space-x-8">
            <p>Calories: <span>{{ recipie.nutrition.calories ?? 'N/A' }}</span></p>
            <p>Protein: <span>{{ recipie.nutrition.macros.protien ?? 'N/A' }}</span></p>
            <p>Carbs: <span>{{ recipie.nutrition.macros.carbs ?? 'N/A' }}</span></p>
            <p>Fats: <span>{{ recipie.nutrition.macros.fat ?? 'N/A' }}</span></p>
        </div>

        <!-- Ingredients -->
        <div class="grid grid-cols-2 grid-flow-row">
            <div v-for="(ingredient, index) in recipie.ingredients" :key="index">
                <p>{{ ingredient.amount }} {{ ingredient.measurement}} - {{ ingredient.name }}</p>
            </div>
        </div>

        <!-- Notes -->
        <div class="my-6">
            <p class="border-b mb-2">Notes</p>
            <ul class="list-disc ml-8">
                <li v-for="(note, index) in recipie.notes" :key="index">{{ note }}</li>
            </ul>
        </div>

        <!-- Cooking Steps -->
        <div class="mt-8">
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
import { computed, defineComponent, PropType, ref } from 'vue'
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