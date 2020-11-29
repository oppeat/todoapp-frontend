import React, { Component } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";
import axios from "axios"

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    if(this.state.editItem === true){
      this.editTodos(newItem.id,newItem);
    }else{
      this.addTodos(newItem);
    }

  };
  clearList = () => {
    this.setState({
      items: []
    });
  };
  handleDelete = id => {
    this.deleteTodos(id);
  };
  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);

    console.log(selectedItem);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    });
  };

  getTodos = () => {
    try {
      axios.get("http://localhost:9000/todos", {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        console.log('response: ', response);
        this.setState({...this.state,items:[...response.data],item:"",editItem:false})
     });

    } catch (error) {
      console.error(error)
    }
  }

  addTodos = (item) => {
    try {
      console.log(JSON.stringify(item));
      axios.post("http://localhost:9000/todos",item, {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        this.getTodos();
     });

    } catch (error) {
      console.error(error)
    }
  }

  editTodos = (id,item) => {
    try {
      console.log(JSON.stringify(item));
      axios.put("http://localhost:9000/todos/"+id,item, {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        this.getTodos();
     });

    } catch (error) {
      console.error(error)
    }
  }

  deleteTodos = (id) => {
    try {
      axios.delete("http://localhost:9000/todos/"+id, {
        headers: {"Access-Control-Allow-Origin": "*"}
        ,responseType: 'json',
      }).then(response => {
        this.getTodos();
     });

    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount() {
    this.getTodos()
  }

  
  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
