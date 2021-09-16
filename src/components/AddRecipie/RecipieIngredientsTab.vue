<template>
    <div class="w-full">
        <p class="text-sm italic text-red-500">{{ rIngredientsError }}</p>

        <div class="grid grid-cols-1 gap-x-8 gap-y-6 mt-6">
            <div v-for="(ingredient, index) in rIngredients" :key="index" class="flex justify-between items-start space-x-2">
                <base-input v-model:modelValue="ingredient.name" label="Ingredient" :validationMessage="getNameValidation(index)" :id="`ingredient${index}name`" class="w-3/4"/>
                <base-input v-model:modelValue="ingredient.amount" label="Amount" :validationMessage="getAmountValidation(index)" :id="`ingredient${index}amount`"/>
                <base-input v-model:modelValue="ingredient.measurement" label="Measurement" :validationMessage="getMeasurementValidation(index)" :id="`ingredient${index}measurement`"/>

                <base-button @click="removeIngredient(index)" class="bg-red-200 text-gray-900 hover:bg-red-400 py-2.5 mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </base-button>
            </div>
        </div>

        <div v-if="!rIngredients || rIngredients.length < 1" class="flex justify-center">
            <base-button @click="addIngredient" class="bg-blue-200 text-gray-900 hover:bg-blue-400 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1 select-none">Add an ingrdeient to recipie</span>
            </base-button>
        </div>

        <div v-if="rIngredients && rIngredients.length > 0" class="w-full flex justify-end items-center mt-5">
            <base-button @click="addIngredient" class="bg-blue-200 text-gray-900 hover:bg-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1 select-none">Add Ingredient</span>
            </base-button>
        </div>
    </div>
</template>

<script lang="ts">
import { useField, useFieldError } from 'vee-validate';
import { defineComponent } from 'vue'

import BaseInput from "@/components/BaseFormControls/BaseInput.vue"
import BaseButton from "@/components/BaseFormControls/BaseButton.vue"

export default defineComponent({
    name: "RecipieIngredientsTab",
    components: {
        BaseInput,
        BaseButton
    },
    setup() {
        const { value: rIngredients, errorMessage: rIngredientsError } = useField("ingredients", "", { initialValue: [] });

        function addIngredient() {
            (rIngredients.value as Record<string,unknown>[]).push({});
        }

        function removeIngredient(index: number) {
            rIngredients.value.splice(index, 1);
        }

        function getNameValidation(index: number) {
            return useFieldError(`ingredients[${index}].name`).value;
        }

        function getAmountValidation(index: number) {
            return useFieldError(`ingredients[${index}].amount`).value;
        }

        function getMeasurementValidation(index: number) {
            return useFieldError(`ingredients[${index}].measurement`).value;
        }

        return {
            rIngredients,
            rIngredientsError,
            getNameValidation,
            getAmountValidation,
            getMeasurementValidation,
            addIngredient,
            removeIngredient,
        }
    }
})
</script>