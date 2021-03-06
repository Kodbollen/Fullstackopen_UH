import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/comments'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject, token) => {
    const auth = `Bearer ${token}`
    const config = {headers: {authorization: auth}}

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default {getAll, create}
