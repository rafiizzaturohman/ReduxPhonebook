import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost:3002/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
})

export const loadContactSuccess = (data) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    data
})

export const loadContactFailure = (data) => ({
    type: 'LOAD_CONTACT_FAILURE',
    data
})

export const loadContact = () => {
    return async dispatch => {
        try {
            const { data } = await url.get('users')

            return dispatch(loadContactSuccess(data.data.users))
        } catch (error) {
            return dispatch(loadContactFailure())
        }
    }
}

export const addContactSuccess = (id, users) => ({
    type: 'ADD_CONTACT_SUCCESS',
    id,
    users
})

export const addContactFailure = (id) => ({
    type: 'ADD_CONTACT_FAILURE',
    id
})

export const addContactRedux = (id, name, phone) => ({
    type: 'ADD_CONTACT',
    id,
    name,
    phone
})

export const addContact = (name, phone) => {
    const id = Date.now()
    return async dispatch => {
        dispatch(addContactRedux(id, name, phone))
        try {
            const { data } = await url.post('users', { name, phone })

            return dispatch(addContactSuccess(id, data.data))
        } catch (error) {
            return dispatch(addContactFailure(id))
        }
    }
}

export const resendContactSuccess = (id, users) => ({
    type: 'RESEND_CONTACT_SUCCESS',
    id,
    users
})

export const resendContactFailure = () => ({
    type: 'RESEND_CONTACT_FAILURE'
})

export const resendContact = (id, name, phone) => {
    return async dispatch => {
        try {
            const { data } = await url.post('users', { name, phone })

            return dispatch(resendContactSuccess(id, data.data))
        } catch (error) {
            return dispatch(resendContactFailure())
        }
    }
}

export const removeContactSuccess = (id) => ({
    type: 'REMOVE_CONTACT_SUCCESS',
    id
})

export const removeContactFailure = (id) => ({
    type: 'REMOVE_CONTACT_FAILURE',
    id
})

export const removeContact = (id) => {
    return async dispatch => {
        try {
            await url.delete(`users/${id}`, { id })

            return dispatch(removeContactSuccess(id))
        } catch (error) {
            return dispatch(removeContactFailure())
        }
    }
}