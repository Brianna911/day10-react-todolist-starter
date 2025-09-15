// src/reducers/TodoReducer.js

export const initialState = [];

export function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state,action.todo];
        case 'DELETE_TODO':
            return state.filter(todo =>todo.id!== action.payload);
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, done: !todo.done } : todo
            );
        case 'LOAD_TODO':
            return action.todos;
        default:
            return state;
    }
}
