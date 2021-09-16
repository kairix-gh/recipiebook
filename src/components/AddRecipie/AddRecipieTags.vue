<template>
        <div class="w-full">
            <div class="flex items-center justify-between">
                <p>Recipie Tags</p>
                <base-button @click="addTag" class="bg-blue-200 text-gray-900 hover:bg-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    <span class="ml-1">Add</span>
                </base-button>
            </div>

            <div class="grid grid-cols-4 gap-x-8 gap-y-4">
                <div v-for="(tag, index) in tags" :key="index" class="flex justify-between items-start space-x-4">
                    <base-input v-model:modelValue="tags[index]" label="Tag" :validationMessage="getTagFieldValidation(index)" :id="`tag${index}`" class="w-full"/>

                    <base-button @click="removeTag(index)" class="bg-red-200 text-gray-900 hover:bg-red-400 py-2.5 mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </base-button>
                </div>
            </div>

            <div v-if="!tags || tags.length < 1" class=" bg-gray-50 rounded-lg p-8 shadow mt-4 border">
                <p class="text-gray-500 text-center italic select-none">Click the add button to add a new tag.</p>
            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import BaseInput from "@/components/BaseFormControls/BaseInput.vue";
import { useFieldError } from 'vee-validate';

import BaseButton from "@/components/BaseFormControls/BaseButton.vue"

export default defineComponent({
    name: "AddRecipieTags",
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
        BaseButton
    },
    setup(props) {
        const tags = reactive(props.data)

        function addTag() {
            tags.push(undefined);
        }

        function removeTag(index: number) {
            tags.splice(index, 1);
        }

        function getTagFieldValidation(index: number) {
            return useFieldError(`tags[${index}]`).value;
        }

        return {
            tags,
            addTag,
            removeTag,
            getTagFieldValidation,
        }
    }
})
</script>