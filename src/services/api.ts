import { APIResponse } from "@/types/api.types";
import axios, { Canceler, AxiosRequestConfig } from "axios";
import { mockRecipies } from "@/mockups/mockRecipies"
import { mockTags } from "@/mockups/mockRecipieTags"

class APIService {
    baseUrl;
    client;
    currentRequests: Canceler[];
    timeout = 0;

    maxRetries = 4;
    retryCodes = [408, 500, 502, 503, 504, 522, 524];
    retryBackoff = 350;

    constructor(baseUrl: string, timeout = 5000) {
        this.baseUrl = baseUrl;
        this.currentRequests = [];
        this.timeout = timeout;
        this.client = axios.create({
            baseURL: baseUrl
        })
    }

    async retryRequest(config: AxiosRequestConfig, retries = this.maxRetries, backoff = this.retryBackoff) {
        return new Promise((resolve, reject) => {
            this.client.request(config)
                .then(response => {
                    return resolve(response)
                })
                .catch(async error => {
                    if (axios.isCancel(error)) {
                        return reject(error);
                    }

                    if (retries > 0 && (error.message == "Network Error" || error.code == "ECONNABORTED" || this.retryCodes.includes(error.response.status))) {
                        await setTimeout(() => { null; }, backoff);
                        await this.retryRequest(error.config, retries - 1, backoff * 2)
                            .catch(error => {
                                return reject(error);
                            })
                    } else {
                        return reject(error);
                    }
                })
        })
    }

    async get(uri: string, accessToken: string | null) {
        if (process.env.NODE_ENV === "development") {
            switch (uri.toLowerCase().split("/")[0]) {
                case "getrecipie":
                    return mockRecipies.filter(e => e.id.toLowerCase() == uri.split("/")[1].toLowerCase())[0];
                case "getrecipiesbytag":
                    return mockRecipies.filter(r =>
                        r.tags.map(t => t.toLowerCase()).includes(uri.split("/")[1].toLowerCase())
                    );
                case "gettags":
                    return mockTags;
                default:
                    return mockRecipies
            }
        }

        let apiResponse: unknown = null;

        const config: AxiosRequestConfig = {
            url: this.baseUrl + uri,
            method: "get",
            timeout: this.timeout,
            headers: {},
            cancelToken: new axios.CancelToken((c) => {
                this.currentRequests.push(c);
            })
        }

        if (accessToken) {
            config.headers = { Authorization: `Bearer ${accessToken}` }
        }

        await this.retryRequest(config)
            .then(response => {
                // TODO: Fix type?
                apiResponse = (response as APIResponse).data;
            })
            .catch(error => {
                apiResponse = this.processError(error);
            })

        return apiResponse;
    }

    async post(uri: string, accessToken: string | null) {
        // if (process.env.NODE_ENV === "development") {
        //     return;
        // }

        let apiResponse: unknown = null;

        const config: AxiosRequestConfig = {
            url: 'https://recipiebookfunc.azurewebsites.net/api/' + uri, //this.baseUrl + uri,
            method: "post",
            timeout: this.timeout,
            headers: {},
            cancelToken: new axios.CancelToken((c) => {
                this.currentRequests.push(c);
            })
        }

        if (accessToken) {
            config.headers = { Authorization: `Bearer ${accessToken}` }
        }

        console.log("Post config:");
        console.log(config);

        await this.retryRequest(config)
            .then(response => {
                // TODO: Fix type?
                apiResponse = (response as APIResponse).data;
            })
            .catch(error => {
                apiResponse = this.processError(error);
            })

        return apiResponse;
    }

    processError(error: Record<string, unknown>) {
        const response: Record<string, string> = {};

        if (axios.isCancel(error)) {
            return response;
        }

        if (error.message == "Network Error" || error.code == "ECONNABORTED") {
            // connection error
            // raise event to inform user
            return response;
        }

        return response;
    }
}

export default new APIService(process.env.VUE_APP_API_BASE_URL);