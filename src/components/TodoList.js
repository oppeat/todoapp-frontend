import React from "react";

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return <Todo content={todo} key={index} id={index} />
  })
  return( 
    <div className='list-wrapper'>
      {todos}
    </div>
  );
}


const Todo = (props) => {
  return(
    <div className='list-item'>
      {props.content}
      <button class="delete is-pulled-right"></button>
    </div>
  );
}

export default TodoList;