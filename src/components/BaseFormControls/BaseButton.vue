<template>
    <button
        class="transition-all duration-300 ease-in-out inline-flex items-center px-2.5 py-1 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="disabled"
    >
        <slot>BaseButton</slot>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
    name: "BaseButton",
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
})
</script>