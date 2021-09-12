<template>
    <div class="focus-within:text-blue-500">
        <label :for="id" class="label-base">
            {{ label }}
        </label>
        <input type="text" :id="id" :placeholder="label" :value="modelValue" autocomplete="off" @input="$emit('update:modelValue', $event.target.value)"
            class="form-base form-base-focus w-full" :class="[ hasError ? 'form-error' : '' ]">
        <span class="form-error-message">{{ validationMessage }}</span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
    name: "BaseInput",
    props: {
        label: {
            type: String,
            default: "Form Label",
        },
        modelValue: {
            type: [String, Number],
            default: "",
            required: true,
        },
        validationMessage: {
            required: true,
        },
        id: {
            type: String,
            default: "BaseInputField",
        }
    },
    setup(props) {
        const hasError = computed(() => {
            return typeof props.validationMessage !== 'undefined'
        })

        return {
            hasError
        }
    }
})
</script>