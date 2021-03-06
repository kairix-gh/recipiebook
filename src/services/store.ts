import { RecipieState, SingleRecipieState, State, TagListState } from "@/types/store.types"
import api from "@/services/api"
import { Recipie } from "@/types/recipie.types";
import { readonly } from "vue";
import { useMsal } from "./msal";

const initialRecipieState = (): RecipieState => ({ data: [], timestamp: null })
const initialTagListState = (): TagListState => ({ data: [], timestamp: null })
const initialRecipieSingleState = (): SingleRecipieState => ({ data: {}, timestamp: null })

const msal = useMsal();

const initialState = (): State => ({
    recipieList: initialRecipieState(),
    recipieListByTag: initialRecipieState(),
    recipie: initialRecipieSingleState(),
    tagList: initialTagListState(),
    msalConfig: {
        browserauthoptions: {

        },
        auth: {
            clientId: "c2f55804-c115-43d2-9cab-e5a8064cc557", //"97188a8b-592c-42ef-9b59-ab6376ec7f97",
            authority: "https://login.microsoftonline.com/avintyri.com",
        },
        cache: {
            cacheLocation: "localStorage",
        },
    },
    account: null,
    accessToken: "",
})

class Store {
    protected state: State;
    private EXPIRED_DATA_MINUTES = 5;

    constructor(initialState: State) {
        this.state = initialState;
    }

    // Data
    private isDateExpired(date: Date) {
        const now = new Date();

        const diff = Math.abs(now.valueOf() - date.valueOf());
        const diffMin = Math.ceil(diff / (1000 * 60));

        return diffMin >= this.EXPIRED_DATA_MINUTES;
    }

    public async expireData() {
        this.state.recipieList.timestamp = null;
        this.state.tagList.timestamp = null;
    }

    // Get Recipie List
    public async getAllRecipies() {
        if (!this.state.recipieList.timestamp || this.isDateExpired(this.state.recipieList.timestamp)) {
            const response = await api.get("getRecipies", null);
            if (response.success) {
                this.state.recipieList.data = response.data as Recipie[];
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
            if (response.success) {
                this.state.tagList.data = response.data as string[];
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

        if (response.success) {
            this.state.recipieListByTag.data = response.data as Recipie[];
            this.state.recipieListByTag.timestamp = new Date();
        } else {
            console.log("Err in getRecipiesBytag");
        }
        // }

        return readonly(this.state.recipieListByTag.data);
    }

    // Get a Recipie
    public async getRecipie(id: string) {
        if (!this.state.recipie.timestamp || this.state.recipie.data?.id != id || this.isDateExpired(this.state.recipie.timestamp)) {
            const response = await api.get("getRecipie/" + id, null);

            if (response.success) {
                this.state.recipie.data = response.data as Recipie;
                this.state.recipie.timestamp = new Date();
            } else {
                console.log("Err in getRecipie");
            }
        }

        return this.state.recipie.data;
    }

    // Add a new Recipie
    public async addRecipie(json: string) {
        const token = await msal.acquireAccessToken();

        const response = await api.post("addRecipie", token, json);

        return response;
    }

    // Delete a recipie!
    public async deleteRecipie(id: string) {
        const token = await msal.acquireAccessToken();

        const response = await api.delete("deleteRecipie/" + id, token)

        return response;
    }

}

const store = new Store(initialState())

export const useStore = (): Store => {
    return store;
}