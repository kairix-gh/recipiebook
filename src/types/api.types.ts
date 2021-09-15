export interface APIResponse {
    status: number,
    success: boolean,
    errors: string[]
    data: unknown
}

export interface APIRecipieList {
    id: string
    name: string
}