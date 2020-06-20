import {
    ADD_TODO,
    DELETE_TODO,
    GET_TODO,
    DONE
}
    from '../type'

export default function (state, action) {
    switch (action.type) {
        case ADD_TODO: return {
            ...state, todo: [...state.todo, action.payload]
        }
        case DELETE_TODO: return {
            ...state,
            todo: [...state.todo.filter((item) => item._id !== action.payload)]
        }
        case GET_TODO:
            return {
                ...state,
                todo: [...action.payload]
            }
        case DONE:
            const idx = state.todo.findIndex(item => item._id === action.payload._id);
            state.todo[idx].done = true;
            return {
                ...state,
                todo: [...state.todo]
            }
        default: return state
    }
}