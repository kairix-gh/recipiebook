export interface RecipieSteps {
    name: string
    tasks: string[]
}

export interface Ingredient {
    name: string
    amount: number
    measurement: string
}

export interface Nutrition {
    calories: number
    macros: NutritionMacros
}

export interface NutritionMacros {
    protien: number
    carbs: number
    fat: number
}

export interface PrepTime {
    name: string
    duration: number
}

export interface Recipie {
    id: string
    name: string
    type: string
    servings: number
    timeToMake: PrepTime[]
    nutrition: Nutrition
    tags: string[]
    ingredients: Ingredient[]
    steps: RecipieSteps[]
    notes: string[]
}