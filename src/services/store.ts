import { RecipieState, State } from "@/types/store.types"
import { reactive } from "vue";
import api from "@/services/api"
import { Recipie } from "@/types/recipie.types";

const initialRecipieState = (): RecipieState => ({ recipieList: [] })

const initialState = (): State => ({
    recipieList: initialRecipieState(),
    recipieListByTag: initialRecipieState(),
    tagList: []
})

class Store {
    protected state: State;

    constructor(initialState: State) {
        this.state = reactive(initialState);
    }

    // Get Recipie List
    public async getAllRecipies() {
        // if (!this.state.recipieList.recipieList) {
        const response = await api.get("getRecipies", null);
        if (response as unknown as Recipie[]) {
            this.state.recipieList.recipieList = response as unknown as Recipie[];
        } else {
            console.log("Err");
        }
        // }

        return this.state.recipieList.recipieList;
    }

    public async getAllTags() {
        const response = await api.get("getTags", null);

        if (response as unknown as string[]) {
            this.state.tagList = response as unknown as string[];
        }

        return this.state.tagList;
    }

    // // Get a Recipie
    // public getRecipie(id: string) {

    // }

    // // Get Recipies by Tag
    // public getRecipiesByTag(tag: string) {

    // }
}

const store = new Store(initialState())

export const useStore = (): Store => {
    return store;
}