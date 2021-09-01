import { RecipieState, State } from "@/types/store.types"
import { reactive } from "vue";
import api from "@/services/api"
import { Recipie } from "@/types/recipie.types";

const initialRecipieState = (): RecipieState => ({ recipieList: [], timestamp: null })

const initialState = (): State => ({
    recipieList: initialRecipieState(),
    recipieListByTag: initialRecipieState()
})

class Store {
    protected state: State;

    constructor(initialState: State) {
        this.state = reactive(initialState);
    }

    // Get Recipie List
    public async getAllRecipies() {
        console.log('start')
        // if (!this.state.recipieList.recipieList) {
        console.log('starting api call')
        const response = await api.get("getRecipies", null);
        console.log("made api call, result:")
        console.log(response);
        if (response as unknown as Recipie[]) {
            this.state.recipieList.recipieList = response as unknown as Recipie[];
        } else {
            console.log("Err");
        }
        // }

        return this.state.recipieList.recipieList;
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