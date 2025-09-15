import { createContext, useReducer } from 'react';
import { todoReducer, initialState } from '../reducers/TodoReducer';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState);
    return (
        <TodoContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};
