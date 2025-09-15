import React, { useReducer } from 'react';

import { TodoContext } from './context/TodoContext';
import { todoReducer, initialState } from './reducers/TodoReducer';
import TodoList from './components/TodoList';
import './App.css';

import * as reducer from './reducers/TodoReducer';
console.log(reducer);

function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            <div className="App">
                {/*<h1>Todo App</h1>*/}
                <TodoList />
            </div>
        </TodoContext.Provider>
    );
}

export default App;
