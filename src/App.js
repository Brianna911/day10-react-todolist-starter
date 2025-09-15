import React, { useReducer } from 'react';

import { TodoContext } from './context/TodoContext';
import { todoReducer, initialState } from './reducers/TodoReducer';
import TodoList from './components/TodoList';
import './App.css';

import * as reducer from './reducers/TodoReducer';
import {createBrowserRouter, NavLink, Outlet, RouterProvider, useParams} from "react-router";
console.log(reducer);
function DefaultLayout() {
    return <>
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'}>home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>about</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/todos'}>TodoList</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/todos/:key'}>TodoDetails</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <h1>HTML</h1>
            <Outlet></Outlet>
        </main>
        <footer>footer copyright</footer>
    </>
}

function ErrorPage() {
    return     <div>
        <h1>404 - Not Found</h1>
        <p>1111</p>
    </div>;

}
function TodoDetail() {
    const {key}  = useParams();
    console.log(key);
    return <h1>This is {key} Detail </h1>;
}

const routes= [{
    path:"/",
    element:<DefaultLayout/>,
    children:[
        {path:"todos",element: <TodoList/>},
        {path:"",element:<h1>Home Page</h1>},
        {path:"about",element:<h1>About Page</h1>},
        {path:"todos/:key",element:<TodoDetail/>},


    ],
    errorElement:<ErrorPage/>,

}];

const router = createBrowserRouter(routes);
function App() {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            <div className="App">
                {/*<h1>Todo App</h1>*/}
                {/*<TodoList />*/}
                <RouterProvider router={router}></RouterProvider>
            </div>
        </TodoContext.Provider>
    );
}
export default App;
