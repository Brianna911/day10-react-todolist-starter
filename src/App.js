import {useReducer} from "react";
import { TodoContext } from './context/TodoContext';
import { todoReducer, initialState } from './reducers/TodoReducer';
import TodoList from './components/TodoList';
import './App.css';
import{ SettingOutlined, HomeOutlined, ProfileOutlined } from '@ant-design/icons';
import * as reducer from './reducers/TodoReducer';
import {createBrowserRouter, NavLink, Outlet, RouterProvider, useParams} from "react-router";
import {Layout, Menu} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Footer} from "antd/es/modal/shared";
console.log(reducer);
const items = [
    {
        key: "home",
        label: <NavLink to={"/"}>Home</NavLink>,
        icon: <HomeOutlined />,
    },
    {
        key: "todolist",
        label: <NavLink to={"/todos"}>TodoList</NavLink>,
        icon: <ProfileOutlined />,
    },
    {
        key: "tododetails",
        label: <NavLink to={"todos/:key"}>TodoDetail</NavLink>,
        icon: <SettingOutlined />,
    },
    // {
    //     key: "done",
    //     label: <NavLink to={"/done"}>Completed</NavLink>,
    //     icon: <CheckCircleOutlined />,
    // },
    {
        key: "about",
        label: <NavLink to={"/about"}>About</NavLink>,
    },
]

function DefaultLayout() {
    return <>
        <Layout>
            <Header>
                <Menu theme={"dark"} mode={"horizontal"} items={items}></Menu>
                <Content>
                    <Outlet>

                    </Outlet>
                </Content>
            </Header>
            <Footer>footer copyright</Footer>
        </Layout>
    </>
}

function ErrorPage() {
    return <div>
        <h1>404 - Not Found</h1>
        <p>1111</p>
    </div>;

}

function TodoDetail() {
    const {key} = useParams();
    console.log(key);
    return <h1>This is {key} Detail </h1>;
}

const routes = [{
    path: "/",
    element: <DefaultLayout/>,
    children: [
        {path: "todos", element: <TodoList/>},
        {path: "", element: <h1>Home Page</h1>},
        {path: "about", element: <h1>About Page</h1>},
        {path: "todos/:key", element: <TodoDetail/>},

    ],
    errorElement: <ErrorPage/>,

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
