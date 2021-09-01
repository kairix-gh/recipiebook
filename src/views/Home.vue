<template>
    <Suspense>
        <template #default>
            <tag-list/>
        </template>

        <template #fallback>
            <p>Loading tags..?</p>
        </template>
    </Suspense>

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
import TagList from "@/components/TagList.vue"

export default defineComponent({
    name: "Home",
    components: {
        RecipieList,
        TagList
    },
    setup() {
        return {
        }
    }
})
</script>