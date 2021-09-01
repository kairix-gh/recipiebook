<template>
    <p>Test</p>
    <Suspense>
        <template #default>
            <recipie-list/>
        </template>

        <template #fallback>
            <p>Loading..?</p>
        </template>
    </Suspense>

    <!-- <RecipieDisplay :recipie="selectedRecipie"/> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from "@/services/store"
import RecipieList from "@/components/RecipieList.vue"

export default defineComponent({
    name: "Home",
    components: {
        RecipieList
    },
    setup() {
        return {
        }
    }
})
</script>