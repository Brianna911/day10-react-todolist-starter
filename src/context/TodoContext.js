import { createContext, useReducer } from 'react';
import { todoReducer, initialState } from '../reducers/TodoReducer';

export const TodoContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
}
