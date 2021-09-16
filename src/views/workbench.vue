<template>
        <div class="flex justify-center items-center relative mb-6">
            <p class="text-xl font-medium italic">Add New Recipie</p>
            <base-button @click="onSubmit" class="absolute right-0 bg-green-500 text-white hover:bg-green-700" :disabled="hasErrors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                Save Recipie
            </base-button>
        </div>

        <div class="w-full">
            <TabGroup as="div" class="lg:flex lg:space-x-4 lg:items-start" vertical>
                <TabList class="flex lg:flex-col lg:w-1/5 p-1 rounded-xl bg-gray-500">
                    <Tab v-for="tab in tabInfo" :key="tab.label" v-slot="{ selected }" as="template">
                        <button type="button" class="w-full py-2.5 text-sm font-medium text-gray-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60 inline-flex items-center justify-center"
                                :class="[ selected ? 'bg-white shadow' : 'text-gray-100 hover:bg-white/[0.12] hover:text-white']">
                                {{ tab.label }}
                                <span v-show="tab.hasError.value" class="ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </span>
                        </button>
                    </Tab>
                </TabList>
                <TabPanels class="mt-4 lg:mt-0 lg:w-4/5">
                    <TabPanel v-for="tab in tabInfo" :key="tab.label" :unmount="false">
                        <component :is="tab.component"/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import BaseButton from "@/components/BaseFormControls/BaseButton.vue"

import RecipieInfoTab from "@/components/AddRecipie/RecipieInformationTab.vue"
import RecipieIngredientsTab from "@/components/AddRecipie/RecipieIngredientsTab.vue"
import RecipiePreparationTab from "@/components/AddRecipie/RecipiePreparationTab.vue"

import { useForm, useFormErrors } from "vee-validate";
import * as yup from "yup";

import {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@headlessui/vue"
import { useStore } from '@/services/store'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "Workbench",
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,

        BaseButton,

        RecipieInfoTab,
        RecipieIngredientsTab,
        RecipiePreparationTab
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const tabInfo = [
            {
                label: "Information",
                component: "RecipieInfoTab",
                hasError: computed(() => {
                    let vKeys = [
                        "name",
                        "servings",
                        "nutrition",
                        "tags"
                    ]

                    return checkTabErrors(vKeys);
                })
            },
            {
                label: "Ingredients",
                component: "RecipieIngredientsTab",
                hasError: computed(() => {
                    return checkTabErrors([ "ingredients" ]);
                })
            },
            {
                label: "Preparation",
                component: "RecipiePreparationTab",
                hasError: computed(() => {
                    return checkTabErrors([ "steps" ]);
                })
            },

        ]

        // Validation
        const schema = yup.object({
            name: yup.string().required().min(1).label("Recipie Name"),
            servings: yup.number().typeError("Number of servings must be a number.").required().min(1, "Recipies must have at least one serving.").label("Servings"),
            // timeToMake: yup.array().required().min(1, "At least one prep time entry is required.").of(yup.object().required().shape({
            //     name: yup.string().required().min(1).label("Step name"),
            //     duration: yup.number().typeError("Duration must be a number.").required().min(1).label("Step dration"),
            // })).label("Recipie Prep Time"),
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

        const onSubmit = handleSubmit(async values => {
            console.log(JSON.stringify(values, null, 4));
            const response = await store.addRecipie(JSON.stringify(values))

            if (response.success) {
                router.push({name: "Recipies"})
            } else {
                console.log(response);
            }
        });

        // Gets all form errors from vee-validate
        const formErrors = useFormErrors();

        // Determines if we disable the save recipie button
        const hasErrors = computed(() => {
            return Object.keys(formErrors.value).length > 0
        })

        // Checks an array of strings to see if any keys in formErrors has partial matches
        function checkTabErrors(keys: string[]) {
            for (let key of keys) {
                if (Object.keys(formErrors.value).filter(k => k.toLowerCase().startsWith(key)).length > 0) {
                    return true;
                }
            }

            return false;
        }


        return {
            tabInfo,
            onSubmit,
            formErrors,
            hasErrors,
        }
    }
})
</script>