import axios from 'axios'
import { BASE_URL } from '../../keys.js'



export const deleteUser = async ({id, token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const url = `${BASE_URL}/users/${id}`
        await axios.delete(url, config)
    } catch (error) {
        console.log('error al eliminar al usuario')
    }
}