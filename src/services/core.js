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

export const Upload = async (formData) => {
    try {
        // Add logging to debug the upload process
        console.log('Starting file upload...');
        
        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found');
            return null;
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        
        // Log the response status
        console.log('Upload response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Upload failed with status: ${response.status}`, errorText);
            throw new Error(`Upload failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Upload successful, received data:', data);
        return data;
    } catch (error) {
        console.error('Error in Upload service:', error);
        return null;
    }
}; 
 