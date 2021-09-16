<template>
        <div class="w-full">
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <p>{{ taskName ?? 'Unnamed Step' }} Tasks</p>
                    <p class="text-sm italic text-red-500">{{ getTaskFieldValidation() }}</p>
                </div>
            </div>

            <div>
                <div v-for="(item, index) in steps" :key="index" class="flex justify-between items-start space-x-4">
                    <base-input v-model:modelValue="steps[index]" label="Task Instructions" :validationMessage="getTaskValidation(index)" :id="`task${index}`" class="w-full"/>

                    <base-button @click="removeItem(index)" class="bg-red-200 text-gray-900 hover:bg-red-400 py-2.5 mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </base-button>
                </div>
            </div>

            <div v-if="steps.length < 1" class="flex justify-center">
                <base-button @click="addItem" class="bg-blue-200 text-gray-900 hover:bg-blue-400 py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    <span class="ml-1 select-none">Add a task to this step</span>
                </base-button>
            </div>

            <div v-if="steps.length > 0" class="flex justify-end mt-8">
                <base-button @click="addItem" class="bg-blue-200 text-gray-900 hover:bg-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    <span class="ml-1 select-none">Add Task</span>
                </base-button>
            </div>
        </div>
</template>

<script lang="ts">
import { useFieldError } from 'vee-validate';
import { defineComponent, PropType, reactive } from 'vue';

import BaseButton from "@/components/BaseFormControls/BaseButton.vue"
import BaseInput from "@/components/BaseFormControls/BaseInput.vue"

export default defineComponent({
    name: "AddRecipieStepTask",
    props: {
        index: {
            type: Number,
            required: true,
        },
        taskName: {
            type: String,
            required: true,
        },
        data: {
            type: Object as PropType<string[]>,
            required: true,
        }
    },
    components: {
        BaseInput,
        BaseButton,
    },
    setup(props) {
        const steps = reactive(props.data)

        function addItem() {
            steps.push("");
        }

        function removeItem(index: number) {
            steps.splice(index, 1);
        }

        function getTaskFieldValidation() {
            return useFieldError(`steps[${props.index}].tasks`).value
        }

        function getTaskValidation(index: number) {
            return useFieldError(`steps[${props.index}].tasks[${index}]`).value
        }

        return {
            steps,
            addItem,
            removeItem,
            getTaskFieldValidation,
            getTaskValidation
        }
    }
})
</script>