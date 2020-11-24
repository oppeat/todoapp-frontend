import React from "react";

const Header = (props) => {
  return(
    <div className='card-header'>
      <h1 className='card-header-title header' style={{top:"-100px",fontSize:"3em"}}>
        My todos: {props.numTodos} remaining
      </h1>
    </div>
  )
}

export default Header;