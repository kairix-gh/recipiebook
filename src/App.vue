<template>
    <div class="w-full border-b py-2 mb-8 sticky top-0 bg-white shadow">
        <Menu/>
    </div>

    <main class="max-w-7xl mx-auto px-2 lg:px-0">
        <router-view/>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from "@/components/Menu.vue"

export default defineComponent({
    name: "App",
    components: {
        Menu
    },
    setup() {

        return {}
    }
})
</script>