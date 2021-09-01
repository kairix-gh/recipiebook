export interface APIResponse {
    status: string,
    success: boolean,
    data: unknown
}

export interface APIRecipieList {
    id: string
    name: string
}