import { GET, POST } from './api'
import { ReadObject, SaveObject } from './storage'

export const DoRegister = async (data) => {
	try {
		const response = await POST('/auth/local/register', {
			username: data.email.split('@')[0],
			email: data.email,
			password: data.password,
			role: 'escort',
			provider: 'local'
		});

		if (response.error) {
			throw new Error(response.error.message);
		}

		return response;
	} catch (error) {
		console.error('Registration error:', error);
		throw error;
	}
}

export const DoLogin = async params => {
	const response = await POST(`/auth/local`, params) 
	if (response?.jwt) {
		await SaveObject('authentication', response)
	}
	return response
}

export const DoLogout = async () => {
	SaveObject('authentication', {})
	return true
}

export const DoForgotPassword = async params => {
	return await POST(`/auth/forgot-password`, params)
}

export const DoResetPassword = async params => {
	return await POST(`/auth/reset-password`, params)
}

export const IsLogged = async () => {
	const authentication = ReadObject('authentication')
	return authentication?.jwt
}

export const ReadMe = async () => {
	return await GET(`/users/me`, true)
}  