import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost:3002/',
    timeout: 1000,
    headers: { 'Authorization': 'token' }
})

// LOAD START
export const loadContactSuccess = (data, page, pages) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    data,
    page,
    pages
})

export const loadContactFailure = (data, page, pages) => ({
    type: 'LOAD_CONTACT_FAILURE',
    data,
    page,
    pages
})

export const loadContact = () => {
    return async dispatch => {
        try {
            const { data } = await url.get('users')

            return dispatch(loadContactSuccess(data.data.users, data.data.page, data.data.pages))
        } catch (error) {
            return dispatch(loadContactFailure())
        }
    }
}
// LOAD END

// ADD START
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
// ADD END

// RESEND START
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
// RESEND END

// UPDATE START
export const updateContactSuccess = (id, users) => ({
    type: 'UPDATE_CONTACT_SUCCESS',
    id,
    users
})

export const updateContactFailure = () => ({
    type: 'UPDATE_CONTACT_FAILURE',
})

export const updateContact = (id, name, phone) => {
    return async dispatch => {
        try {
            const { data } = await url.put(`users/${id}`, { name, phone })

            return dispatch(updateContactSuccess(id, data.data))
        } catch (error) {
            return dispatch(updateContactFailure())
        }
    }
}
// UPDATE END

// REMOVE START
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
            await url.delete(`users/${id}`)

            return dispatch(removeContactSuccess(id))
        } catch (error) {
            return dispatch(removeContactFailure())
        }
    }
}
// REMOVE END

// SEARCH START
// export const searchContactSuccess = (id) => ({
//     type: 'SEARCH_CONTACT_SUCCESS',
//     id
// })

// export const searchContactFailure = (id) => ({
//     type: 'SEARCH_CONTACT_FAILURE',
//     id
// })

// export const searchContact = (name, phone) => {
//     return async dispatch => {
//         try {
//             await url.get(`users`, { params: { name, phone } })

//             return dispatch(searchContactSuccess(name, phone))
//         } catch (error) {
//             return dispatch(searchContactFailure())
//         }
//     }
// }
// SEARCH END