import axios from "axios";
const getToDo = async () => {
    try {
        const res = await axios.get("https://sever-todo.vercel.app/todoList");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const addToDo = async (data) => {
    try {
        const res = await axios.post(
            "https://sever-todo.vercel.app/todoList",
            data
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

const deleteToDo = async (id) => {
    try {
        const res = await axios.delete(
            `https://sever-todo.vercel.app/todoList/${id}`
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

const deleteSelectedToDo = async (arrId) => {
    try {
        const deletePromises = arrId.map((id) =>
            axios.delete(`https://sever-todo.vercel.app/todoList/${id}`)
        );
        const res = await Promise.all(deletePromises);
        return res;
    } catch (error) {
        console.log(error);
    }
};

const updateToDo = async (id, data) => {
    try {
        const res = await axios.put(
            `https://sever-todo.vercel.app/todoList/${id}`,
            data
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export {addToDo, deleteToDo, updateToDo, getToDo, deleteSelectedToDo};
