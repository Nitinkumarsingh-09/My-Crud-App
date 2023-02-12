import React, { Component } from 'react'
import Home  from './components/Home'
import ShowUsers from './components/ShowUsers'
import Users from './components/Users'
import Header from './components/Header'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {route} from './Router.js'
import "./App.css"
import EditUser from './components/EditUser'



export default class App extends Component {
 
  constructor(props){
  super(props);
  
  this.id=window.localStorage.getItem('hash').split('/')[1];
  this.view={
    home:<Home></Home>,
    createuser:<Users></Users>,
    ["edituser/"+this.id]:<EditUser userId={this.id}></EditUser>,
    showuser:<ShowUsers></ShowUsers>,
  }
}
componentDidMount(){
  console.log("running App.jsx")
}
  render() {
    return (
      <>
    
        <Header></Header>
        {this.loadContent()}
        
      </>
    )
  }
  loadContent=()=>{
    return this.view[route];
  }
}
