export const initialState = [];

export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { text: action.payload, completed: false }];
        case 'TOGGLE_TODO':
            return state.map((todo, index) =>
                index === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'DELETE_TODO':
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
};
