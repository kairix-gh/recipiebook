import { Recipie } from "./recipie.types";

export interface RecipieState {
    data: Recipie[]
    timestamp: Date | null
}

export interface SingleRecipieState {
    data: Recipie | Record<string, unknown>
    timestamp: Date | null
}

export interface TagListState {
    data: string[]
    timestamp: Date | null
}

export interface State {
    recipieList: RecipieState
    recipieListByTag: RecipieState
    recipie: SingleRecipieState
    tagList: TagListState
}