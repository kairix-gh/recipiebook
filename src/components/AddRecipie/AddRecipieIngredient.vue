<template>
        <div class="w-full">
            <div class="flex items-center justify-between">
                <p>Ingredients</p>
                <button @click="addIngredient" class="bg-blue-200 px-2 py-2 rounded-lg text-gray-900 hover:bg-blue-400 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    <span class="ml-1 select-none">Add</span>
                </button>
            </div>

            <div class="grid grid-cols-2 gap-x-8 gap-y-6">
                <div v-for="(ttm, index) in ingredients" :key="index" class="flex justify-between items-center space-x-4">
                    <div class="focus-within:text-blue-500 w-3/4">
                        <label :for="`ingredient${index}name`" class="label-base">
                            Ingredient
                        </label>
                        <input type="text" :id="`ingredient${index}name`" placeholder="Tag" autocomplete="off" v-model="ingredients[index].name" class="form-base form-base-focus w-full">
                    </div>

                    <div class="focus-within:text-blue-500">
                        <label :for="`ingredient${index}amt`" class="label-base">
                            Amount
                        </label>
                        <input type="text" :id="`ingredient${index}amt`" placeholder="Tag" autocomplete="off" v-model.number="ingredients[index].amount" class="form-base form-base-focus w-full">
                    </div>

                    <div class="focus-within:text-blue-500">
                        <label :for="`ingredient${index}measurement`" class="label-base">
                            Measurement
                        </label>
                        <input type="text" :id="`ingredient${index}measurement`" placeholder="Tag" autocomplete="off" v-model="ingredients[index].measurement" class="form-base form-base-focus w-full">
                    </div>

                    <button @click="removeIngredient(index)" class="bg-red-200 px-2 py-2 mt-6 rounded-lg text-gray-900 hover:bg-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>

            <div v-if="ingredients.length < 1" class=" bg-gray-50 rounded-lg p-8 shadow mt-4 border">
                <p class="text-gray-500 text-center italic select-none">Click the add button to new ingredient.</p>
            </div>
        </div>
</template>

<script lang="ts">
import { Ingredient } from '@/types/recipie.types'
import { defineComponent, PropType, reactive } from 'vue'
export default defineComponent({
    name: "AddRecipieIngredient",
    props: {
        data: {
            type: Object as PropType<Ingredient[]>,
            required: true,
        }
    },
    setup(props) {
        const ingredients = reactive(props.data)

        function addIngredient() {
            ingredients.push({
                name: "",
                amount: 0,
                measurement: ""
            })
        }

        function removeIngredient(index: number) {
            ingredients.splice(index, 1);
        }

        return {
            ingredients,
            addIngredient,
            removeIngredient
        }
    }
})
</script>