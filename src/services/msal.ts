import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import mitt, { Emitter, EventType } from "mitt";

class MsalWrapper {
    private _msal: PublicClientApplication;
    public eventBus: Emitter<Record<EventType, unknown>>;

    private config = {
        browserauthoptions: {

        },
        auth: {
            clientId: "c2f55804-c115-43d2-9cab-e5a8064cc557", //"97188a8b-592c-42ef-9b59-ab6376ec7f97",
            authority: "https://login.microsoftonline.com/avintyri.com",
        },
        cache: {
            cacheLocation: "localStorage",
        },
    };
    private currentAccount: AccountInfo | null = null;
    private accessToken = "";

    constructor() {
        this._msal = new PublicClientApplication(this.config);
        this.eventBus = mitt();

        const accounts = this._msal.getAllAccounts();

        if (accounts.length > 0) {
            this.eventBus.emit("userInfoUpdate")
            this._msal.setActiveAccount(accounts[0]);
            this.currentAccount = accounts[0];
        }
    }

    public isCurrentUserAdmin() {
        if (this.currentAccount && this.currentAccount.idTokenClaims) {
            // This is ok for now since we only have 1 possible role the user can have.
            return ((this.currentAccount.idTokenClaims as Record<string, unknown>).roles as string[])[0] == "Recipie.Add"
        }

        return false;
    }

    public isLoggedIn() {
        return this.currentAccount != null;
    }

    public getCurrentUser() {
        return this.currentAccount;
    }

    public async acquireAccessToken() {
        if (this.currentAccount != null) {
            const request = { scopes: ["api://c2f55804-c115-43d2-9cab-e5a8064cc557/user_impersonation"] }
            try {
                const tokenResponse = await this._msal.acquireTokenSilent(request);
                this.accessToken = tokenResponse.accessToken;
            } catch (e) {
                console.error(`Silent Token Acquisition failed, using interactive mode. ${e}`);
                const tokenResponse = await this._msal.acquireTokenPopup(request);
                this.accessToken = tokenResponse.accessToken;
            }

            return this.accessToken;
        }

        return "";
    }

    public async SignIn() {
        await this._msal.loginPopup()
            .then(async () => {
                const myAccounts = this._msal.getAllAccounts();
                this._msal.setActiveAccount(myAccounts[0]);
                this.currentAccount = myAccounts[0];

                await this.acquireAccessToken();
            })
            .catch(e => {
                console.error(`Authentication Error: ${e}`);
            })
        this.eventBus.emit("userInfoUpdate")
    }

    public async SignOut() {
        await this._msal.logoutRedirect()
            .then(async () => {
                this.currentAccount = null;
                this.accessToken = "";
            })
            .catch(e => {
                console.error(`Authentication Logout Error: ${e}`);
            })
        this.eventBus.emit("userInfoUpdate")
    }
}

const msal = new MsalWrapper();

export const useMsal = (): MsalWrapper => {
    return msal;
}