import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/views/Home.vue")
    },
    {
        path: "/recipies",
        name: "Recipies",
        component: () => import("@/views/ViewAllRecipies.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
    },
    {
        path: "/recipie/:id",
        name: "ViewRecipie",
        component: () => import("@/views/ViewRecipie.vue")
    },
    {
        path: "/recipies/tag/:tag",
        name: "RecipiesByTag",
        component: () => import("@/views/ViewRecipiesByTag.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
