import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://68c78cc15d8d9f51473223fc.mockapi.io/',
});

export const getTodos = async ()=>{
    const response = await instance.get('todos')
    return response
}
export const createTodos = async (todo)=>{
    const response = await instance.post('todos',todo)
    return response
}
export const deteleTodos = async (id)=> {
    const response = await instance.delete(`todos/${id}`)
    return response
}
export const updateTodos = async (id,updateData)=> {
    return await instance.put(`todos/${id}`,updateData);
}

