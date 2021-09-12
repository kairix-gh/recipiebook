<template>
    <div class="w-full">
        <div class="flex items-center justify-between">
            <div class="flex flex-col">
                <p>Time to Make</p>
                <p class="text-sm italic text-red-500">{{ validationErrors }}</p>
            </div>
            <button @click="addTimeToMake" class="bg-blue-200 px-2 py-2 rounded-lg text-gray-900 hover:bg-blue-400 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1">Add</span>
            </button>
        </div>

        <div v-for="(ttm, index) in prepTime" :key="index" class="flex items-center justify-between space-x-8">
            <base-input v-model:modelValue="prepTime[index].name" label="Name" :validationMessage="getNameFieldValidation(index)" :id="`prepTime${index}name`" class="w-2/3"/>

            <div class="flex items-center justify-between w-1/3">
                <base-input v-model:modelValue="prepTime[index].duration" label="Duration" :validationMessage="getDurationFieldValidation(index)" :id="`prepTime${index}duration`" class="w-1/2" />

                <button @click="removeTimeToMake(index)" class="bg-red-200 px-2 py-2 mt-8 rounded-lg text-gray-900 hover:bg-red-400 self-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>

        <div v-if="!prepTime || prepTime?.length < 1" class=" bg-gray-50 rounded-lg p-8 shadow mt-4 border">
            <p class="text-gray-500 text-center italic select-none">Click the add button to add a new cooking duration.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { useFieldError } from 'vee-validate'
import { defineComponent, reactive } from 'vue'
import BaseInput from "@/components/AddRecipie/BaseInput.vue"

export default defineComponent({
    name: "AddRecipiePrepTime",
    props: {
        data: {
            type: Array,
            required: true,
        },
        validationErrors: {
            required: true,
        }
    },
    components: {
        BaseInput,
    },
    setup(props) {
        const prepTime = reactive(props.data)

        function addTimeToMake() {
            prepTime.push({})
        }

        function removeTimeToMake(index: number) {
            prepTime.splice(index, 1);
        }

        function getNameFieldValidation(index: number) {
            return useFieldError(`timeToMake[${index}].name`).value;
        }

        function getDurationFieldValidation(index: number) {
            return useFieldError(`timeToMake[${index}].duration`).value;
        }

        return {
            prepTime,
            addTimeToMake,
            removeTimeToMake,
            getNameFieldValidation,
            getDurationFieldValidation
        }
    }
})
</script>