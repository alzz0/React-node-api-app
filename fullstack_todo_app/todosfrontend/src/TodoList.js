import React, {Component} from "react";
import "isomorphic-fetch";
import TodoItem from "./TodoItem"
import TodoForm from "./TodoForm"
import * as apiCalls from "./api"

const APIURL="/api/todos/"
const fetch = require('node-fetch')


class TodoList extends Component{
  
    constructor (props){
    super (props)
      this.state={
      todos:[]
    }
    this.addTodo=(this.addTodo.bind(this))
  }
  
  
  async loadTodos(){
    let todos=await apiCalls.getTodos();
    this.setState({todos})
  }
 async addTodo(val){
       let newTodo=await apiCalls.createTodo(val)
      this.setState({todos:[...this.state.todos,newTodo]})
    }
  
  async deleteTodo(id){
   await apiCalls.removeTodo(id)
      const todos=this.state.todos.filter(todo=>todo._id!==id)
      this.setState({todos:todos})

  }
  async toggleTodo(todo){
    let updateTodo = await apiCalls.updateTodo(todo)
  

      const todos=this.state.todos.map(t=>(
        t._id===updateTodo._id)?{...t,completed:!t.completed}:t)
      this.setState({todos:todos})

  }
    render(){
      const todos=this.state.todos.map((t)=>(
        <TodoItem key={t._id} {...t}
        onDelete={this.deleteTodo.bind(this,t._id)}
        onToggle={this.toggleTodo.bind(this,t)}
        />
        ))
        
        return(
          <div>
          <h1>Todo List</h1>
          <TodoForm addTodo={this.addTodo}/>
          <ul>
          {todos}
          </ul>
          </div>
            )

    }

  componentWillMount(){
   this.loadTodos()
  }

}


export default TodoList