import { Recipie } from "./recipie.types";

export interface APIResponse {
    status: string,
    success: boolean,
    data: Recipie | Recipie[]
}

export interface APIRecipieList {
    id: string
    name: string
}