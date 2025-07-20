import React, { useRef, useContext } from "react";
import classes from './NewTodo.module.css';
import TodosContext from "../store/todos-context";


const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const textInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = textInputRef.current!.value;
        if (enteredText.trim().length === 0) {
            return;
        }

        todosCtx.addTodo(enteredText);
    }

    return <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="text">Todo Text</label>
        <input ref={textInputRef} type="text" id="text" />
        <button>Add Todo</button>
    </form>
}

export default NewTodo;