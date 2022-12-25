const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            return action.data.map(item => ({
                id: item.id,
                name: item.name,
                phone: item.phone,
                sent: true
            }))
        case 'ADD_CONTACT':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ]
        case 'ADD_CONTACT_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.users.id,
                        name: action.users.name,
                        phone: action.users.phone,
                        sent: true
                    }
                }
                return item
            })
        case 'ADD_CONTACT_FAILURE':
            return state.map(item => {
                if (item.id === action.id) {
                    action.id = item.id
                    item.sent = false
                }
                return item
            })

        case 'RESEND_CONTACT_SUCCESS':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        id: action.users.id,
                        name: action.users.name,
                        phone: action.users.phone,
                        sent: true
                    }
                }
                return item
            })

        case 'REMOVE_CONTACT_SUCCESS':
            return state.filter(item => item.id !== action.id)
        case 'REMOVE_CONTACT_FAILURE':
        case 'LOAD_CONTACT_FAILURE':
        default:
            return state
    }
}

export default users