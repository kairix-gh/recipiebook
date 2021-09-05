<template>
    <div class="w-full">
        <div class="flex items-center justify-between">
            <p>Time to Make</p>
            <button @click="addTimeToMake" class="bg-blue-200 px-2 py-2 rounded-lg text-gray-900 hover:bg-blue-400 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                <span class="ml-1">Add</span>
            </button>
        </div>

        <div v-for="(ttm, index) in prepTime" :key="index" class="flex items-center justify-between space-x-8">
            <div class="focus-within:text-blue-500 w-2/3">
                <label :for="`prepTime${index}name`" class="label-base">
                    Name
                </label>
                <input type="text" :id="`prepTime${index}name`" placeholder="Recipie Name" autocomplete="off" v-model="prepTime[index].name" class="form-base form-base-focus w-full">
            </div>
            <div class="flex items-center justify-between w-1/3">
                <div class="focus-within:text-blue-500 w-1/2">
                    <label :for="`prepTime${index}duration`" class="label-base">
                        Duration
                    </label>
                    <input type="text" :id="`prepTime${index}duration`" placeholder="Recipie Name" autocomplete="off" v-model.number="prepTime[index].duration" class="form-base form-base-focus w-full">
                </div>
                <button @click="removeTimeToMake(index)" class="bg-red-200 px-2 py-2 mt-6 rounded-lg text-gray-900 hover:bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>

        <div v-if="prepTime.length < 1" class=" bg-gray-50 rounded-lg p-8 shadow mt-4 border">
            <p class="text-gray-500 text-center italic select-none">Click the add button to add a new cooking duration.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { PrepTime } from '@/types/recipie.types'
import { defineComponent, PropType, reactive } from 'vue'
export default defineComponent({
    name: "AddRecipiePrepTime",
    props: {
        data: {
            type: Object as PropType<PrepTime[]>,
            required: true,
        }
    },
    setup(props) {
        const prepTime = reactive(props.data)

        function addTimeToMake() {
            prepTime.push({
                name: "",
                duration: 0
            })
        }

        function removeTimeToMake(index: number) {
            prepTime.splice(index, 1);
        }

        return {
            prepTime,
            addTimeToMake,
            removeTimeToMake
        }
    }
})
</script>