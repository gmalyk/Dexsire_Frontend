import { GET, POST, PUT, DELETE } from './api'

// Add a simple request deduplication mechanism
const pendingRequests = new Map()

export const Create = async (table, params) => {
    return await POST(`/${table}`, params, true);
}

export const Read = async (table) => {
    const endpoint = `/${table}${table?.indexOf('?') !== -1 ? '&': '?'}${table?.indexOf('populate') !== -1 ? '': 'populate=*'}`
    
    // Check if there's already a pending request for this endpoint
    if (pendingRequests.has(endpoint)) {
        return pendingRequests.get(endpoint)
    }

    // Create the promise for this request
    const promise = GET(endpoint, true)
    pendingRequests.set(endpoint, promise)

    try {
        const result = await promise
        pendingRequests.delete(endpoint)
        return result
    } catch (error) {
        pendingRequests.delete(endpoint)
        throw error
    }
}

export const ReadOne = async (table, id) => {
    return await GET(`/${table}/${id}?populate=*`, true);
}

export const Update = async (table, params, id) => {
    return await PUT(`/${table}/${id}`, params, true);
}

export const Delete = async (table, id) => {
    return await DELETE(`/${table}/${id}`, true);
}