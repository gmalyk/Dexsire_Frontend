import * as CryptoJS from "crypto-js";
import { toast } from 'react-toastify';
import { API_ENDPOINT, S3_ENDPOINT } from 'services/api'

export const exposeStrapiError = result => { 

    if( !result ){
        toast.error( 'Cant connect to server, try again later')
        return true;
    }
    
    if(result?.error && result?.data?.[0]?.messages?.[0]?.message && typeof result?.data?.[0]?.messages?.[0]?.message === 'string'){
        toast.error(result?.data?.[0]?.messages?.[0]?.message )
        return true;
    }else if(result?.error && result?.message?.[0]?.messages?.[0]?.message && typeof result?.message?.[0]?.messages?.[0]?.message === 'string'){
        toast.error(result?.message?.[0]?.messages?.[0]?.message )
        return true;
    }else if(result?.error && result?.data?.[0]?.message && typeof result?.data?.[0]?.message === 'string'){
        toast.error(result?.data?.[0]?.message )
        return true;
    }else if(result?.error && result?.message && typeof result?.message === 'string'){
        toast.error(result?.message )
        return true;
    }else if(result?.error && result?.error?.message && typeof result?.error?.message === 'string'){
        toast.error(result?.error?.message )
        return true;
    }

    if(result?.error && result?.error?.details?.errors?.length ){
        result?.error?.details?.errors?.map( item => {
            toast.error(item?.message )
            return true;
        })
        return true;
    }
    
    return false;
}
 
export const normalizeStrapiList = result => {
    return result?.data?.length ? result?.data.map(item => ({
        id: item.id,
        ...item.attributes
    })) : [] 
}
 
export const normalizeStrapiRegisterSolo = result => { 
    return result?.id && result?.attributes ? { 
        id: result?.id,  
        ...result?.attributes
    } : result?.data?.id ? result?.data?.attributes ? {
        id: result?.data?.id,  
        ...result?.data?.attributes
    } : result?.data : result
}

export const normalizeStrapiRegister = result => { 
    if(!result) return null;
    let results = normalizeStrapiRegisterSolo(result)  
    Object.keys(results).map(attrKey => {
        results[attrKey] = results[attrKey]?.data ? normalizeStrapiRegisterSolo(results[attrKey]) : results[attrKey]
        results[attrKey] = typeof results[attrKey]?.data === 'object' ? results[attrKey]?.data : results[attrKey]
        results[attrKey] = results[attrKey]?.length && results[attrKey]?.[0]?.attributes ? 
            results[attrKey]?.map(normalizeStrapiRegisterSolo)
        : results[attrKey] 


        return true;
    }) 
    return results;
}
 
export const normalizeStrapiPayload = (form, formtypes) => {

    formtypes.map(item => {
        if(form[item.name]){ 
            if((item.type === 'float' || item.type === 'decimal') && item.name === 'price' && typeof form[item.name] === 'string' ){
                form[item.name] = parseFloat(form[item.name].replace(/R|\$|\.| /g, '').replace(',','.'))
            }
    
            if( item.type === 'float' || item.type === 'decimal' ){
                form[item.name] = parseFloat(form[item.name])
            }
    
            if( item.type === 'biginteger' || item.type === 'integer' ){
                form[item.name] = parseInt(form[item.name])
            }
            
            if( (item.type === 'date' || item.type === 'time' || item.type === 'datetime') && typeof form[item.name]?.getFullYear === 'function' ){
                form[item.name] = parseStrapiDate(form[item.name])
            }
            
            if( item.type === 'time' ){
                form[item.name] = (`${form[item.name]}`.split("T")).pop() 
            }
            
            if( item.type === 'date' ){
                form[item.name] = `${(`${form[item.name]}`.split("T")).shift()}` 
            } 
            
        }
        return true;
    })

    return { ...form, data:{...form}}
}

export const numerize = number => {
    return parseInt(number) < 10 ? `0${number}` : `${number}`
}

export const parseStrapiDate = date => {  
    return typeof date?.getFullYear !== 'function' ? date : `${date.getFullYear()}-${numerize(date?.getMonth()+1)}-${numerize(date?.getDate())}T${numerize(date?.getHours())}:${numerize(date?.getMinutes())}:${numerize(date?.getSeconds())}`
} 
 
export const parseStrapiImage = url => {
    return url?.indexOf('://') !== -1 ? url : `${S3_ENDPOINT}${url}`
}

export const findShowableParam = item => {
    
    const notAllowed = [ 
        'id',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
        'publishedAt',
        'attributes',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'published_by',
        'published_at',
    ]
    return Object.keys(item).filter(fit => !notAllowed.includes(fit) ).shift()
}

export const filterSystemParams = (fit, attrs, item) => {

    const notAllowed = [ 
        'id',
        'createdAt',
        'updatedAt',
        'createdBy',
        'updatedBy',
        'publishedAt',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
        'published_by',
        'published_at',
    ]

    if(item.uid.indexOf('plugin::') !== -1){
        notAllowed.push('provider')
        notAllowed.push('role')
    } 

    return !notAllowed.includes(fit) && (!attrs.private || attrs.type === 'password')
} 

export const capitalize = (s) => {
    if(!s){ return `` ;}
    let vs = `${s}`
    return `${ vs.charAt(0).toUpperCase() }${vs.slice(1)}`;
}


export const objectToQueryString = (obj, parentKey = '') => {
    let queryString = '';

    Object.keys(obj).forEach(key => {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;

        if (Array.isArray(obj[key])) {
            obj[key].forEach((value, index) => {
                queryString += `${fullKey}[${index}]=${value}&`;
            });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            queryString += objectToQueryString(obj[key], fullKey);
        } else {
            queryString += `${fullKey}=${obj[key]}&`;
        }
    });
    
    if (queryString.endsWith('&')) {
        queryString = queryString.slice(0, -1);
    }

    return queryString;
}

export const getOS = ()  => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf("Win") !== -1) {
        return "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
        return "MacOS";
    } else if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) {
        return "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        return "Android";
    } else if (userAgent.indexOf("like Mac") !== -1) {
        return "iOS";
    }

    return "Unknown OS";
}

export const generateUUID = () => {
    const timestamp = new Date().getTime(); 
    const randomValue = Math.random(); 
    const combined = timestamp + randomValue.toString(); 

    const hash = CryptoJS.SHA256(combined).toString(CryptoJS.enc.Base64);    
    return hash.substring(0, 32); 
}

export const getBirthdate = age => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - (age||0))
    return d.toISOString()
}