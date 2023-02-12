import React, { Component } from 'react'
import { route,redirect } from '../Router'

export default class Users extends Component {

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
                  <h1>Create Users</h1>
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
                        <input type="button" value="save" onClick={this.saveData} className="btn btn-outline-primary" />
                    </form>
                </div>
                </div>
      </>
    )
  }
  saveData=()=>{
    // console.clear();
    //    console.log(this.state);
    const url=' http://localhost:5000/users';
    
    let newObject={
      name:this.state.name,
      email:this.state.email,
      mobile:this.state.mobile,
      password:this.state.password,
    }
    

    let promise=fetch(url,{
      headers:{
        'Content-Type':'application/json'
      },
      method:'POST',
      body:JSON.stringify(newObject)
    })
    
    promise.then((response)=>{
      if(response.ok){
        this.setState({
          name:"",
          email:"",
          mobile:"",
          password:"",
          msg:<span className='success'>Created successfully !</span>
      });

      // let ID1=setTimeout(() => {
      //   this.setState({
      //     msg:""
      //   })
      // },5000);
      return redirect('showuser');
      }


    }).then((data)=>{
      console.log(data)
    }).catch((error)=>{
      console.log(error);

      this.setState({
        msg:<span className='error'>OOPS Try Again Later</span>
      });
      // let ID1=setTimeout(() => {
      //   this.setState({
      //     msg:""
      //   })
      // },5000);
      
    });

  }
}
