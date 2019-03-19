import React, {useState, useReducer } from 'react'

import './simple-todo.css'

/* Tests useReducer hook */

const initialTodoState = {
    todos: []
}

/**
 * Generates an id that is not cryptographically secure.
 */
function generateId(len) {
    var id = "";
    for(var i = 0; i < len; i++) {
        var digit = parseInt(Math.random() * 10)
        id += digit.toString()
    }
    return id;
}

function handleTodos(state, action) {

    var todos = [];

    switch(action.type) {
        case "add_todo":
            todos = Object.assign([], state.todos)
            todos.push({ id:action.id, text:action.text })
            return { ...state, todos: todos }
        case "remove_todo":
            todos = Object.assign([], state.todos)
            todos = todos.filter((value) => value.id !== action.id)
            return { ...state, todos: todos }
        default:
            throw new Error("Unknown reducer action type.")
    }
}

export default function SimpleTodo() {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [todoState, dispatchTodoState] = useReducer(handleTodos, initialTodoState)

    var todoList = <div>No current entries.</div>

    if(todoState.todos.length > 0) {
        todoList = [];
    }

    todoState.todos.forEach(value => {
        todoList.push(<div key={value.id}>
                        <div className="todo-entry">{value.text}</div> 
                        <button className="inline-btn small-btn" onClick={e => dispatchTodoState({ type: "remove_todo", id: value.id })}>Delete</button>
                      </div>)
    })

    return <div style={{textAlign: "left"}}>
                <div>
                    <h3>Add Todo Items</h3>
                </div>

                Current Todos:
                <div className="todo-list">
                    {todoList}
                </div>

                <button className="btn" onClick={(e)=> { setDialogOpen(true) }}>Add Todo</button>

                <Dialog open={dialogOpen} close={() => { setDialogOpen(false) }}>
                    Add a Todo Item
                    <hr />
                    <AvailableTodos selected={(value) => {
                        //Generate an id for the selected todo.

                        var id = null
                        var iterations = 0
                        
                        do
                        {
                            if(iterations > 100) { 
                                throw new Error("Could not generate a unique id for the todo item.")
                            }

                            id = generateId(10) 

                            var found = false;
                            //Check that the id isn't in use.
                            for(var i = 0; i < todoState.todos.length; i++) {
                                if(todoState.todos[i].id === id) {
                                    found = true;
                                    break;
                                }
                            }

                            iterations++
                        } while(found)

                        //Add the todo
                        dispatchTodoState({ type: "add_todo", id: id, text: value })
                    }} />
                </Dialog>
            </div>
}

/**
 * @property {function} selected An event indicating that an item was selected, in the form of selected(value)
 */
function AvailableTodos(props) {

    var values = [
        "Pick up dry cleaning",
        "Wash car",
        "Find keys",
        "Shop for groceries",
        "Go to beach",
        "Take a trip",
        "Read a book",
        "Watch TV"
    ]

    var divs = [];

    values.forEach((value) => {
        divs.push(<div key={value} onClick={(e) => { if(props.selected) { props.selected(value) }}}>{value}</div>);
    })

    //Use CSS grid to display available todo options
    return (<div className="todo-list-options">
                {divs}
            </div>)

}


/**
 * 
 * @property {function} close Event that indicates the user is trying to close the dialog
 */
function Dialog(props) {

    if(!props.open) {
        return null
    }

    var height = document.body.scrollHeight;

    return (<div className="dialog" style={{height: height}} onClick={(e) => { props.close() }} aria-hidden={!props.open} role="dialog">
                <div className="dialog-box">
                    <div className="dialog-content">
                        {props.children}
                    </div>
                </div>
            </div>)
}