import React, { createContext, useState } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

const TodosContext = createContext<TodosContextObj>({
    items: [],
    addTodo: () => { },
    removeTodo: (id: string) => { }
});

export const TodosProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text: string) => {
        const newTodo = new Todo(text);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const removeTodoHandler = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <TodosContext.Provider value={{
            items: todos,
            addTodo: addTodoHandler,
            removeTodo: removeTodoHandler
        }}>
            {props.children}
        </TodosContext.Provider>
    );
};

export const TodosConsumer = TodosContext.Consumer;

export default TodosContext;
