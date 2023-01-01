import axios from 'axios'
import { BASE_URL } from '../../keys'

export const getUser = async ({id, token}, state) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${BASE_URL}/users/${id}`
        const res = await axios.get(url, config)
        state(res.data.notes.reverse())
        
    } catch (error) {
        console.log('error al obtener al usuario')
    }
}

export const getNoteId = async (id , state, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url =`${BASE_URL}/notes/${id}`
        const res = await axios.get(url, config)
        state(res.data)
    } catch (error) {
        console.log('erro al traer la nota')
    }
}

export const createNote = async ( content, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${BASE_URL}/notes`
        await axios.post(url, content, config)
    } catch (error) {
        console.log('error al crear la nota')
    }

}

export const updateNote = async (id, content, { token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${BASE_URL}/notes/${id}`
        await axios.put(url, content, config)
    } catch (error) {
        console.log('error al actualizar la nota')
    }

}

export const deleteNote = async (id, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${BASE_URL}/notes/${id}`
        const res = await axios.delete(url, config)
        const { data } = res
        return data
    } catch (error) {
        console.log('error al eliminar la nota')
    }
}