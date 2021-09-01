<template>
    <Popover open="true">
        <div class="max-w-7xl mx-auto">
            <!-- Mobile Menu -->
            <div class="md:hidden">
                <div class="flex items-center justify-between">
                    <router-link :to="{ name: 'Home' }" class="p-2">
                        <p>Home</p>
                    </router-link>

                    <PopoverButton class="p-2 inline-flex items-center justify-center hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span class="sr-only">Open Menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </PopoverButton>
                </div>
                <PopoverPanel class="absolute top-0 inset-x-0 transition transform origin-top z-50 bg-white shadow-lg">
                    <div class="flex items-center justify-between mb-6">
                        <router-link :to="{ name: 'Home' }" class="p-2">
                            <p>Home</p>
                        </router-link>

                        <PopoverButton as="div" class="flex justify-end p-2">
                            <button>
                                <span class="sr-only">Close Menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </PopoverButton>
                    </div>

                    <ul class="inline-flex flex-col w-full">
                        <li v-for="(item, index) in items" :key="index" class="inline-flex items-center border-b last:border-0 w-full">
                            <router-link :to="{ name: item.route }" class="m-2 w-1/2">
                                {{ item.label }}
                            </router-link>
                        </li>
                    </ul>

                </PopoverPanel>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center ">
                <router-link :to="{ name: 'Home' }" class="group py-2">
                    <span class="border-b-2 border-white group-hover:border-blue-500 transition-all duration-300 ease-in-out">Home</span>
                </router-link>

                <ul class="space-x-8 px-6 inline-flex">
                    <li v-for="(item, index) in items" :key="index" class="group">
                        <router-link :to="{ name: item.route }" class=" inline-block py-2">
                            <span class="border-b-2 border-white group-hover:border-blue-500 transition-all duration-300 ease-in-out">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>

            </div>
        </div>
    </Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Popover, PopoverPanel, PopoverButton } from "@headlessui/vue"

export default defineComponent({
    name: "Menu",
    components: {
        Popover,
        PopoverPanel,
        PopoverButton
    },
    setup() {
        const items = [
            { label: "Recipies", route: "Recipies" },
            { label: "About", route: "About" },
        ]

        return {
            items
        }
    }
})
</script>