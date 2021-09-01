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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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