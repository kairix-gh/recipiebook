import { RecipieState, State, TagListState } from "@/types/store.types"
import api from "@/services/api"
import { Recipie } from "@/types/recipie.types";
import { readonly } from "vue";

const initialRecipieState = (): RecipieState => ({ data: [], timestamp: null })
const initialTagListState = (): TagListState => ({ data: [], timestamp: null })

const initialState = (): State => ({
    recipieList: initialRecipieState(),
    recipieListByTag: initialRecipieState(),
    tagList: initialTagListState(),
})

class Store {
    protected state: State;
    private EXPIRED_DATA_MINUTES = 5;

    constructor(initialState: State) {
        this.state = initialState;
    }

    private isDateExpired(date: Date) {
        const now = new Date();

        const diff = Math.abs(now.valueOf() - date.valueOf());
        const diffMin = Math.ceil(diff / (1000 * 60));

        return diffMin >= this.EXPIRED_DATA_MINUTES;
    }

    // Get Recipie List
    public async getAllRecipies() {
        if (!this.state.recipieList.timestamp || this.isDateExpired(this.state.recipieList.timestamp)) {
            const response = await api.get("getRecipies", null);
            if (response as unknown as Recipie[]) {
                this.state.recipieList.data = response as unknown as Recipie[];
                this.state.recipieList.timestamp = new Date();
            } else {
                console.log("Err in getAllRecipies");
            }
        }

        return readonly(this.state.recipieList.data);
    }

    public async getAllTags() {
        if (!this.state.tagList.timestamp || this.isDateExpired(this.state.tagList.timestamp)) {
            const response = await api.get("getTags", null);
            if (response as unknown as string[]) {
                this.state.tagList.data = response as unknown as string[];
                this.state.recipieList.timestamp = new Date();
            } else {
                console.log("Err in getAllTags");
            }
        }

        return readonly(this.state.tagList.data);
    }

    // Get Recipies by Tag
    // TODO: Sanitize tag for safety
    public async getRecipiesByTag(tag: string) {
        // if (!this.state.recipieListByTag.timestamp || this.isDateExpired(this.state.recipieListByTag.timestamp)) {
        const response = await api.get("getRecipiesByTag/" + tag, null);

        if (response as unknown as Recipie[]) {
            this.state.recipieListByTag.data = response as unknown as Recipie[];
            this.state.recipieListByTag.timestamp = new Date();
        } else {
            console.log("Err in getRecipiesBytag");
        }
        // }

        return readonly(this.state.recipieListByTag.data);
    }

    // // Get a Recipie
    // public getRecipie(id: string) {

    // }

}

const store = new Store(initialState())

export const useStore = (): Store => {
    return store;
}