import axios from 'axios'

const url_api = 'http://192.168.1.25:3001/api/v1'

// Общая функция для обработки ошибок
const handleError = error => {
	throw error.response ? error.response.data : error.message
}

// Регистрация
export const registerUser = async userData => {
	try {
		const response = await axios.post(`${url_api}/register`, userData)
		return response.data
	} catch (error) {
		handleError(error)
	}
}

// Вход
export const loginUser = async credentials => {
	try {
		const response = await axios.post(`${url_api}/login`, credentials)
		return response.data
	} catch (error) {
		handleError(error)
	}
}

// История улучшений
export const getImprovementHistory = async token => {
	try {
		const response = await axios.get(`${url_api}/photos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	} catch (error) {
		handleError(error)
	}
}

// Запрос на улучшение
export const requestImprovement = async (token, improvementData) => {
	try {
		const response = await axios.post(`${url_api}/photos`, improvementData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data
	} catch (error) {
		handleError(error)
	}
}
