<template>
    <div class="space-y-6">
        <!-- Recipie Name -->
        <base-input v-model:modelValue="rName" label="Recipie Name" :validationMessage="rNameError" class="w-full" />

        <!-- Recipie Servings -->
        <base-input v-model:modelValue="rServings" label="Servings" :validationMessage="rServingsError" class="w-full" />

        <!-- Nutrition Information -->
        <div>
            <p class="mb-4">Nutritional Information</p>
            <div class="flex flex-col md:flex-row items-start justify-between md:space-x-8">
                <base-input v-model:modelValue="rCalories" label="Calories" :validationMessage="rCaloriesError" class="w-full" />

                <base-input v-model:modelValue="rProtein" label="Protein" :validationMessage="rProteinError" class="w-full" />
                <base-input v-model:modelValue="rCarbs" label="Carbs" :validationMessage="rCarbsError" class="w-full" />
                <base-input v-model:modelValue="rFat" label="Fat" :validationMessage="rFatError" class="w-full" />
            </div>
        </div>

        <!-- Tags -->
        <add-recipie-tags v-model:data="rTags" :validationErrors="rTagsError"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import "@/assets/css/forms.css"

import AddRecipieTags from "@/components/AddRecipie/AddRecipieTags.vue"
import BaseInput from "@/components/BaseFormControls/BaseInput.vue"
import { useField } from 'vee-validate'

export default defineComponent({
    name: "RecipieInfoTab",
    components: {
        BaseInput,
        AddRecipieTags
    },
    setup() {
        const { value: rName, errorMessage: rNameError } = useField("name");
        const { value: rServings, errorMessage: rServingsError } = useField("servings");
        const { value: rCalories, errorMessage: rCaloriesError } = useField("nutrition.calories");
        const { value: rProtein, errorMessage: rProteinError } = useField("nutrition.macros.protein");
        const { value: rCarbs, errorMessage: rCarbsError } = useField("nutrition.macros.carbs");
        const { value: rFat, errorMessage: rFatError } = useField("nutrition.macros.fat");
        const { value: rTags, errorMessage: rTagsError } = useField("tags", "", { initialValue: [] });

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
            rTags,
            rTagsError
        }
    }
})
</script>