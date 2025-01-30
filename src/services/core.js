import { GET, POST, PUT, DELETE } from './api'

export const Create = async (table, params) => {
    return await POST(`/${ table }`, params, true);
}

export const Read = async (table) => {
    return await GET(`/${ table }${ table?.indexOf('?') !== -1 ? '&': '?'  }${ table?.indexOf('populate') !== -1 ? '': 'populate=*'  }`, true);
}

export const ReadOne = async (table, id) => {
    return await GET(`/${ table }/${id}?populate=*`, true);
}

export const Update = async (table, params, id) => {
    return await PUT(`/${ table }/${id}`, params, true);
}

export const Delete = async (table, id) => {
    return await DELETE(`/${ table }/${ id }`, true);
} 
 