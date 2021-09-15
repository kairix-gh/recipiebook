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
                    return {
                        success: true,
                        status: 200,
                        errors: [],
                        data: mockRecipies.data.filter(e => e.id.toLowerCase() == uri.split("/")[1].toLowerCase())[0]
                    };
                case "getrecipiesbytag":
                    return {
                        success: true,
                        status: 200,
                        errors: [],
                        data: mockRecipies.data.filter(r =>
                            r.tags.map(t => t.toLowerCase()).includes(uri.split("/")[1].toLowerCase())
                        )
                    }
                case "gettags":
                    return mockTags;
                default:
                    return mockRecipies
            }
        }

        let apiResponse: APIResponse = {
            success: false,
            status: -1,
            errors: [],
            data: null,
        };

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
                apiResponse = (response as Record<string, unknown>).data as APIResponse;
            })
            .catch(error => {
                apiResponse = this.processError(error);
            })

        return apiResponse;
    }

    async post(uri: string, accessToken: string | null, data: string | null) {
        // if (process.env.NODE_ENV === "development") {
        //     return;
        // }

        let apiResponse: APIResponse = {
            success: false,
            status: -1,
            errors: [],
            data: null,
        };

        const config: AxiosRequestConfig = {
            url: 'https://recipiebookfunc.azurewebsites.net/api/' + uri, //this.baseUrl + uri,
            method: "post",
            timeout: this.timeout,
            headers: {},
            cancelToken: new axios.CancelToken((c) => {
                this.currentRequests.push(c);
            }),
            data: data
        }

        if (accessToken) {
            config.headers = { Authorization: `Bearer ${accessToken}` }
        }

        await this.retryRequest(config)
            .then(response => {
                // TODO: Fix type?
                apiResponse = (response as Record<string, unknown>).data as APIResponse;
            })
            .catch(error => {
                apiResponse = this.processError(error);
            })

        return apiResponse;
    }

    processError(error: Record<string, unknown>) {
        let response: APIResponse = {
            success: false,
            status: 400,
            errors: [],
            data: null,
        };

        if (axios.isCancel(error)) {
            response.errors.push("The client cancelled the request.")
            return response;
        }

        if (error.message == "Network Error" || error.code == "ECONNABORTED") {
            // connection error
            // raise event to inform user
            response.status = -1;
            response.errors.push("A client network error occured.")
            return response;
        }

        if (error.response) {
            response = error.response as APIResponse;
        } else if (error.request) {
            // ??
            response.errors.push(error.request as string);
        } else {
            response.errors.push(error.message as string);
        }

        return response;
    }
}

export default new APIService(process.env.VUE_APP_API_BASE_URL);