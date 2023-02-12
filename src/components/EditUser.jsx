import React, { Component } from 'react'
import { redirect } from '../Router'
import config from '../config/config.json'

export default class EditUser extends Component {

  //lifecycle : mounting state
  constructor(props){
  super(props);
  this.state={
      name:"",
      email:"",
      mobile:"",
      password:"",
      users:[] ,
      msg:"",  
  }
}

  render=()=> {
    
    return (
      <>
         <div className="row">
                <div className="col-sm-6 mx-auto text-dark p-5">
                <h1>EDIT USER</h1>
                    {this.state.msg}
                    <form >
                        Name:
                        <input type="text" name="name"  
                        value={this.state.name} 
                        onChange={(event)=>{
                          this.setState({name:event.target.value})}}
                          className="form-control" />
                        <br />
                        Email:
                        <input type="email" name="email"  
                         value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}} className="form-control" />
                        <br />
                        Mobile:
                        <input type="mobile" name="number" 
                         value={this.state.mobile} onChange={(event)=>{this.setState({mobile:event.target.value})}} className="form-control" />
                        <br />
                        Password:
                        <input type="password" name="password" 
                         value={this.state.password} onChange={(event)=>{this.setState({password:event.target.value})}} className="form-control" />
                        <br />
                        <input type="button" value="Update" 
                        // onClick={()=>{{this.updateData(this.props.userId)}}} 
                        onClick={this.updateData}
                        className="btn btn-outline-primary" />
                    </form>
                </div>
                </div>
      </>
    )
  }
  componentDidMount(){
   // api ko leke aaynge
   let id =this.props.userId;
  //  const url="http://localhost:5000/users/" + id;

   let promise=fetch(config.LOCAL_URL+id).then((response)=>{
    if(response.ok){
      return response.json();
    }
   }).then((data)=>{
    this.setState({
      name:data.name,
      email:data.email,
      mobile:data.mobile,
      password:data.password
    })
    console.log(data);
   }).catch((error)=>{
    console.log(error);
   });
  }
  updateData=()=>{
      // console.log("passed from update ",id)
      let id =this.props.userId;
      // console.log("get id  from props",id)

      let updateUser={
        name:this.state.name,
        email:this.state.email,
        mobile:this.state.mobile,
        password:this.state.password,
      }

      // Api Request 

      let promise=fetch(config.LOCAL_URL+id,{
       headers:{
        "Content-Type":"application/json"
       },
       method:"PUT",
       body:JSON.stringify(updateUser)
      }).then((response)=>{
          if(response.ok){
             return redirect('showuser');
          }
      }).then((data)=>{

      }).catch((error)=>{

      })
    
  }
  
}
