<template>
    <p class="text-center font-medium text-xl mb-12 italic">Add New Recipie</p>

    <form @submit="onSubmit">
        <div class="flex flex-col space-y-12 mb-12">
            <!-- Recipie Name -->
            <base-input v-model:modelValue="rName" label="Recipie Name" :validationMessage="rNameError" class="w-full" />

            <!-- Recipie Servings -->
            <base-input v-model:modelValue="rServings" label="Servings" :validationMessage="rServingsError" class="w-full" />

            <!-- Time to Make -->
            <add-recipie-prep-time v-model:data="rTimeToMake" :validationErrors="rTimeToMakeError"/>

            <!-- Nutrition Information -->
            <div>
                <p class="mb-4">Nutritional Information</p>
                <div class="flex items-center justify-between space-x-8">
                    <base-input v-model:modelValue="rCalories" label="Calories" :validationMessage="rCaloriesError" class="w-full" />

                    <base-input v-model:modelValue="rProtein" label="Protein" :validationMessage="rProteinError" class="w-full" />
                    <base-input v-model:modelValue="rCarbs" label="Carbs" :validationMessage="rCarbsError" class="w-full" />
                    <base-input v-model:modelValue="rFat" label="Fat" :validationMessage="rFatError" class="w-full" />
                </div>
            </div>

            <!-- Tags -->
            <add-recipie-tags v-model:data="rTags" :validationErrors="rTimeToMakeError"/>

            <!-- Ingredients -->
            <add-recipie-ingredient :data="rIngredients" :validationErrors="rIngredientsError"/>

            <!-- Steps -->
            <add-recipie-steps :data="rSteps" :validationErrors="rStepsError"/>

            <!-- Notes -->
            <add-recipie-note :data="rNotes" :validationErrors="rNotesError"/>

        </div>

        <div class="flex justify-end mt-16 mb-12">
            <button type="submit" class="inline-flex items-center bg-green-400 rounded-lg px-2.5 py-2 space-x-1 text-white hover:bg-green-600 transition-all ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <span>Save Recipie</span>
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import "@/assets/css/forms.css"

import AddRecipieIngredient from "@/components/AddRecipie/AddRecipieIngredient.vue"
import AddRecipieTags from "@/components/AddRecipie/AddRecipieTags.vue"
import AddRecipiePrepTime from "@/components/AddRecipie/AddRecipiePrepTime.vue"
import AddRecipieSteps from "@/components/AddRecipie/AddRecipieSteps.vue"
import AddRecipieNote from "@/components/AddRecipie/AddRecipieNote.vue"
import BaseInput from "@/components/AddRecipie/BaseInput.vue"

import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useStore } from '@/services/store'

export default defineComponent({
    name: "AddRecipie",
    components: {
        AddRecipieIngredient,
        AddRecipieTags,
        AddRecipiePrepTime,
        AddRecipieSteps,
        AddRecipieNote,
        BaseInput,
    },
    setup() {
        // Validation Schema
        const schema = yup.object({
            name: yup.string().required().min(1).label("Recipie Name"),
            servings: yup.number().typeError("Number of servings must be a number.").required().min(1, "Recipies must have at least one serving.").label("Servings"),
            timeToMake: yup.array().required().min(1, "At least one prep time entry is required.").of(yup.object().required().shape({
                name: yup.string().required().min(1).label("Step name"),
                duration: yup.number().typeError("Duration must be a number.").required().min(1).label("Step dration"),
            })).label("Recipie Prep Time"),
            nutrition: yup.object().nullable().notRequired().shape({
                calories: yup.lazy((val) => (val === "" ? yup.string().notRequired().nullable(true) : yup.number().notRequired().min(0))),
                macros: yup.object().nullable().shape({
                    protein: yup.lazy((val) => (val === "" ? yup.string().notRequired().nullable(true) : yup.number().notRequired().min(0))),
                    carbs: yup.lazy((val) => (val === "" ? yup.string().notRequired().nullable(true) : yup.number().notRequired().min(0))),
                    fat: yup.lazy((val) => (val === "" ? yup.string().notRequired().nullable(true) : yup.number().notRequired().min(0)))
                })
            }),
            tags: yup.array().of(yup.string().required().min(1).label("Tag")),
            ingredients: yup.array().required().min(1, "At least one ingredient is required.").of(yup.object().shape({
                name: yup.string().required().min(1).label("Name"),
                amount: yup.number().required().min(1).label("Amount"),
                measurement: yup.string().required().min(1).label("Measurement"),
            })),
            steps: yup.array().required().min(1, "At least one step to make the recipie is required.").of(yup.object().shape({
                name: yup.string().required().min(1).label("Recipie Step"),
                tasks: yup.array().required().min(1, "At least one task for each recipie step is required.").of(yup.string().required().min(1).label("Task"))
            })),
            notes: yup.array().notRequired().nullable().of(yup.string().required().min(1).label("Note"))
        })

        // Setup vee-validate form
        const { handleSubmit } = useForm({
            validationSchema: schema
        });

        // Form Fields to rendering/user input
        const { value: rName, errorMessage: rNameError } = useField("name");
        const { value: rServings, errorMessage: rServingsError } = useField("servings");
        const { value: rCalories, errorMessage: rCaloriesError } = useField("nutrition.calories");
        const { value: rProtein, errorMessage: rProteinError } = useField("nutrition.macros.protein");
        const { value: rCarbs, errorMessage: rCarbsError } = useField("nutrition.macros.carbs");
        const { value: rFat, errorMessage: rFatError } = useField("nutrition.macros.fat");
        const { value: rTimeToMake, errorMessage: rTimeToMakeError } = useField("timeToMake", "", { initialValue: [] });
        const { value: rTags, errorMessage: rTagsError } = useField("tags", "", { initialValue: [] });
        const { value: rIngredients, errorMessage: rIngredientsError } = useField("ingredients", "", { initialValue: [] });
        const { value: rSteps, errorMessage: rStepsError } = useField("steps", "", { initialValue: [] });
        const { value: rNotes, errorMessage: rNotesError } = useField("notes", "", { initialValue: [] });


        const store = useStore();

        // Submit handling
        const onSubmit = handleSubmit(async values => {
            console.log(JSON.stringify(values, null, 4));
            const response = await store.addRecipie(JSON.stringify(values))


            alert(response);
            console.log(response);
        })

        return {
            rName,
            rNameError,
            rServings,
            rServingsError,
            rCalories,
            rCaloriesError,
            rProtein,
            rProteinError,
            rCarbs,
            rCarbsError,
            rFat,
            rFatError,
            rTimeToMake,
            rTimeToMakeError,
            rTags,
            rTagsError,
            rIngredients,
            rIngredientsError,
            rSteps,
            rStepsError,
            rNotes,
            rNotesError,

            onSubmit,
        }
    }
})
</script>