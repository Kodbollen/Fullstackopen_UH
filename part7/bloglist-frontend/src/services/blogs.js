import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

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

const put = async (updatedObject, token) => {
    const auth = `Bearer ${token}`
    const config = {headers: {authorization: auth}}
    const url = `${baseUrl}/${updatedObject._id}`

    const response = await axios.put(url, updatedObject, config)
    return response.data
}

const remove = async (objectToDelete, token) => {
    const auth = `Bearer ${token}`
    const config = {headers: {authorization: auth}}
    const url = `${baseUrl}/${objectToDelete.id}`

    const response = await axios.delete(url, config)
    return response.data
}

export default {getAll,	create, put, remove}
