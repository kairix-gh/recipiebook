import { Recipie } from "./recipie.types";

export interface RecipieState {
    recipieList: Recipie[]
    timestamp: Date | null
}

export interface State {
    recipieList: RecipieState
    recipieListByTag: RecipieState
}