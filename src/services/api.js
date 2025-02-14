import { ReadObject, SaveObject } from './storage'

const ENDPOINTS = {
	'localhost' : 'http://localhost:1337/api',
	'dexsire.com' : 'https://api.dexsire.com/api'
} 

const BUCKET_ENDPOINTS = {
	'localhost' : 'http://localhost:1337',
	'dexsire.com' : 'https://api.dexsire.com'
} 
 
const SOCKET_ENDPOINTS = {
	'localhost' : 'http://localhost:1337',
	'dexsire.com' : 'https://api.dexsire.com'
}
 
const CHECKOUT_ENDPOINTS =  {
	// 'localhost' : 'http://localhost:3001',
	'localhost' : 'https://pubclick-marketing.com',
	'dexsire.com' : 'https://pubclick-marketing.com'
}

const envEndpoint = (ends) => {
	return (
		Object.keys(ends)
		.filter(fit => `${ window.location.origin }`.indexOf(fit) !== -1 )
		.map( key => ends[key] )[0]
	) || ends['localhost']
} 

export const API_ENDPOINT = envEndpoint(ENDPOINTS) 
export const S3_ENDPOINT = envEndpoint(BUCKET_ENDPOINTS) 
export const SOCKET_ENDPOINT = envEndpoint(SOCKET_ENDPOINTS)
export const CHECKOUT_ENDPOINT = envEndpoint(CHECKOUT_ENDPOINTS)

export const GetHeaders = async authenticated => {
	const headers = { 
		'Content-Type': 'application/json',
	}
	
	// Add API Token for public endpoints
	headers['Authorization'] = `Bearer ${process.env.REACT_APP_API_TOKEN}`
	
	// Add JWT token for authenticated endpoints if available
	const authentication = await ReadObject('authentication')
	if (authenticated && authentication.jwt) {
		headers['Authorization'] = `Bearer ${authentication.jwt}`
	}
	
	return { headers }
}

export const ServerFetch = async (url, options, authenticated) => {
	const { headers } = await GetHeaders(authenticated)
	console.log('Fetching:', url, 'with options:', options)
	try{
		const response = await fetch(url, {
			...options,
			headers: {
				...headers,
				'Content-Type': 'application/json'
			}
		}) 
		const data = await response.json()
		
		if (!response.ok) {
			console.error('Server error:', {
				status: response.status,
				data: data
			})
			return {
				error: true,
				status: response.status,
				message: data?.error?.message || 'An error occurred'
			}
		}
		
		if (response.statusCode === 403 && authenticated) {
			await SaveObject('authentication', {})
		}
		return data
	}catch(error){
		console.error('ServerFetchError:', error)
		return {
			error: true,
			message: error.message
		}
	}
}

export const GET = async (path, authenticated = false) => {
	const url = `${API_ENDPOINT}${path}`;
	console.log('Making GET request to:', url);
	
	try {
		const response = await ServerFetch(
			url,
			{ method: 'GET' },
			authenticated
		);
		
		console.log('GET Response:', response);
		return response;
	} catch (error) {
		console.error('GET error:', error);
		return { error: true, message: error.message };
	}
}

export const POST = async (path, body, authenticated = false) => {
	const url = `${API_ENDPOINT}${path}`;
	console.log('Making POST request to:', url, 'with body:', body);
	
	try {
		const response = await ServerFetch(
			url,
			{
				method: 'POST',
				body: JSON.stringify(body)
			},
			authenticated
		);
		
		console.log('POST Response:', response);
		return response;
	} catch (error) {
		console.error('POST error:', error);
		return { error: true, message: error.message };
	}
}

export const PUT = async (path, body, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'PUT',
			body: JSON.stringify(body)
		},
		authenticated
	)
}

export const DELETE = async (path, authenticated = false) => {
	return await ServerFetch(
		`${API_ENDPOINT}${path}`,
		{
			method: 'DELETE'
		},
		authenticated
	)
} 

export const ReadAddressesByZipCode = async (zipCode) => {
    try{
        let result = await fetch(`https://viacep.com.br/ws/${ zipCode }/json/`);
        return result.json();
    }catch(err){ return false; }
}

    //test the db connection


export const PostImage = async (fileToUpload) => {
    const formData = new FormData()
    formData.append('files', fileToUpload, fileToUpload.name)  
    let { headers } = await GetHeaders(true) 
    delete headers['Content-Type']
    let response = await fetch(`${API_ENDPOINT}/upload`, { method: 'POST', body: formData, headers });   
    let responseJson = await response.json()  
    return responseJson; 
}
  
export const PrepareImageFile = (image) => {
	let btc = window.atob(image.source)
	let btn = new Array(btc.length);
	for (var i = 0; i < btc.length; i++) {
		btn[i] = btc.charCodeAt(i);
	}
	var bta = new Uint8Array(btn);
	let boobs = new Blob([bta], {type: 'image/png' } );
	return new File([boobs], `${ image.filename }`)
} 

export const UploadImage = (file) => {
	return new Promise((resolve, reject) => { 
		let reader = new FileReader();
		reader.onload = async () => {
			let source = `${ reader.result }`.split(',')[1]
			let image = {
				filename: file.name,
				filetype: file.type,
				source
			}
			let thefile = PrepareImageFile(image);
			let result = await PostImage(thefile);

			resolve(result);
		};
		reader.readAsDataURL(file);
	})
} 

export const getUserIp = async () => {
	const response = await fetch('https://api.ipify.org?format=json');
	const data = await response.json();
	return data.ip;
};

export const register = async (userData) => {
	return await POST('/api/auth/local/register', {
		username: userData.email,
		email: userData.email,
		password: userData.password
	});
}

export const DoRegister = async (userData) => {
	console.log('Starting registration with:', userData);
	
	// Format the registration data according to Strapi's requirements
	const registrationData = {
		username: userData.email?.replace(/ /g, ''),
		email: userData.email?.replace(/ /g, ''),
		password: userData.password,
		name: userData.name,
		provider: 'local',
		confirmed: true
	};
	
	console.log('Sending registration data:', registrationData);
	
	return await POST('/api/auth/local/register', registrationData);
}

export const DoLogin = async (credentials) => {
	return await POST('/api/auth/local', {
		identifier: credentials.identifier,
		password: credentials.password
	});
}

export const Create = async (path, data) => {
	return await POST(`/${path}`, data, true);
}

export const UpdateMe = async (data) => {
	return await PUT('/users/me', data, true);
}

// Update the registration flow to handle the escort-specific data
export const completeEscortProfile = async (userId, escortData) => {
	return await PUT(`/api/users/${userId}`, {
		role: 3,  // Escort role
		plan: 1,  // Default plan
		name: escortData.name,
		confirmed: true,
		blocked: false
	}, true);
}

// Function to get all roles
export const getRoles = async () => {
    const response = await GET('/users-permissions/roles');
    console.log('Available roles:', response); // This will show all roles and their IDs
    return response;
}