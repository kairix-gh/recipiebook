<template>
    <div class="w-full">
        <p class="text-sm text-red-500 italic">{{ rStepsError }}</p>

        <div class="space-y-8 mt-6">
            <div v-for="(item, index) in rSteps" :key="index" class="border shadow rounded-lg px-4 py-2">
                <div class="flex justify-between items-start space-x-4">
                    <base-input v-model:modelValue="item.name" label="Step name" :validationMessage="getNameValidation(index)" :id="`step${index}name`" class="w-full"/>

                    <base-button @click="removeItem(index)" class="bg-red-200 text-gray-900 hover:bg-red-400 py-2.5 mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </base-button>
                </div>

                <div class="ml-10 mt-8">
                    <add-recipie-step-task :index="index" :taskName="item.name" :data="item.tasks"/>
                </div>
            </div>

        </div>

        <div v-if="rSteps.length < 1" class=" flex justify-center">
            <base-button @click="addItem" class="bg-blue-200 text-gray-900 hover:bg-blue-400 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1 select-none">Add a preparation step to recipie</span>
            </base-button>
        </div>

        <div v-if="rSteps.length > 0" class="flex justify-end mt-8">
            <base-button @click="addItem" class="bg-blue-200 text-gray-900 hover:bg-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1 select-none">Add Step</span>
            </base-button>
        </div>
    </div>
</template>

<script lang="ts">
import { useField, useFieldError } from 'vee-validate';
import { defineComponent } from 'vue';

import BaseInput from "@/components/BaseFormControls/BaseInput.vue"
import BaseButton from "@/components/BaseFormControls/BaseButton.vue"

import AddRecipieStepTask from "@/components/AddRecipie/AddRecipieStepTask.vue"

export default defineComponent({
    name: "RecipiePreparationTab",
    components: {
        BaseButton,
        BaseInput,
        AddRecipieStepTask
    },
    setup() {
        const { value: rSteps, errorMessage: rStepsError } = useField("steps", "", { initialValue: [] });
        const { value: rNotes, errorMessage: rNotesError } = useField("notes", "", { initialValue: [] });

        function addItem() {
            (rSteps.value as Record<string,unknown>[]).push({
                name: "",
                tasks: [],
            });
        }

        function removeItem(index: number) {
            rSteps.value.splice(index, 1);
        }

        function getNameValidation(index: number) {
            return useFieldError(`steps[${index}].name`).value;
        }

        return {
            rSteps,
            rStepsError,
            rNotes,
            rNotesError,
            addItem,
            removeItem,
            getNameValidation
        }
    }
})
</script>