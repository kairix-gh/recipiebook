<template>
    <p class="text-center font-medium text-xl mb-12 italic">Add New Recipie</p>

    <div class="flex flex-col space-y-12 mb-12">
        <!-- Recipie Name -->
        <div class="focus-within:text-blue-500 w-full">
            <label for="recipieName" class="label-base">
                Recipie Name
            </label>
            <input type="text" id="recipieName" placeholder="Recipie Name" autocomplete="off" v-model="recipie.name" class="form-base form-base-focus w-full">
        </div>

        <!-- Recipie Servings -->
        <div class="focus-within:text-blue-500 w-full">
            <label for="recipieServings" class="label-base">
                Servings
            </label>
            <input type="text" id="recipieServings" placeholder="Recipie Name" autocomplete="off" v-model.number="recipie.servings" class="form-base form-base-focus w-full">
        </div>

        <!-- Time to Make -->
        <add-recipie-prep-time :data="recipie.timeToMake"/>

        <!-- Nutrition Information -->
        <div>
            <p class="mb-4">Nutritional Information</p>
            <div class="flex items-center justify-between space-x-8">
                <div class="focus-within:text-blue-500 w-full">
                    <label for="recipieCalories" class="label-base">
                        Calories
                    </label>
                    <input type="text" id="recipieCalories" placeholder="Recipie Name" autocomplete="off" v-model.number="recipie.nutrition.calories" class="form-base form-base-focus w-full">
                </div>

                <div class="focus-within:text-blue-500 w-full">
                    <label for="recipieProtein" class="label-base">
                        Protein
                    </label>
                    <input type="text" id="recipieProtein" placeholder="Recipie Name" autocomplete="off" v-model.number="recipie.nutrition.macros.protien" class="form-base form-base-focus w-full">
                </div>

                <div class="focus-within:text-blue-500 w-full">
                    <label for="recipieCarbs" class="label-base">
                        Carbs
                    </label>
                    <input type="text" id="recipieCarbs" placeholder="Recipie Name" autocomplete="off" v-model.number="recipie.nutrition.macros.carbs" class="form-base form-base-focus w-full">
                </div>

                <div class="focus-within:text-blue-500 w-full">
                    <label for="recipieFats" class="label-base">
                        Fat
                    </label>
                    <input type="text" id="recipieFats" placeholder="Recipie Name" autocomplete="off" v-model.number="recipie.nutrition.macros.fat" class="form-base form-base-focus w-full">
                </div>
            </div>
        </div>

        <!-- Tags -->
        <add-recipie-tags :data="recipie.tags"/>

        <!-- Ingredients -->
        <add-recipie-ingredient :data="recipie.ingredients"/>

        <!-- Steps -->
        <add-recipie-steps :data="recipie.steps"/>

        <!-- Notes -->
        <add-recipie-note :data="recipie.notes"/>

    </div>

    <div class="flex justify-end mt-16 mb-12">
        <button class="inline-flex items-center bg-green-400 rounded-lg px-2.5 py-2 space-x-1 text-white hover:bg-green-600 transition-all ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <span>Save Recipie</span>
        </button>
    </div>
</template>

<script lang="ts">
import { Ingredient, PrepTime, RecipieSteps } from '@/types/recipie.types'
import { defineComponent, reactive, ref } from 'vue'
import "@/assets/css/forms.css"

import AddRecipieIngredient from "@/components/AddRecipie/AddRecipieIngredient.vue"
import AddRecipieTags from "@/components/AddRecipie/AddRecipieTags.vue"
import AddRecipiePrepTime from "@/components/AddRecipie/AddRecipiePrepTime.vue"
import AddRecipieSteps from "@/components/AddRecipie/AddRecipieSteps.vue"
import AddRecipieNote from "@/components/AddRecipie/AddRecipieNote.vue"

export default defineComponent({
    name: "AddRecipie",
    components: {
        AddRecipieIngredient,
        AddRecipieTags,
        AddRecipiePrepTime,
        AddRecipieSteps,
        AddRecipieNote
    },
    setup() {
        const recipie = reactive({
            id: "",
            name: "",
            type: "",
            servings: 0,
            timeToMake: [] as PrepTime[],
            nutrition: {
                calories: 0,
                macros: {
                    protein: 0,
                    carbs: 0,
                    fat: 0
                }
            },
            tags: [] as string[],
            ingredients: [] as Ingredient[],
            steps: [] as RecipieSteps[],
            notes: [] as string[]
        });

        return {
            recipie
        }
    }
})
</script>