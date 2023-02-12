import React, { Component } from 'react'
import { redirect } from '../Router';



export default class ShowUsers extends Component {
 // Mounting state
 constructor(props){
  console.log('This is mounting state:1st Cycle');
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
 componentDidMount(){
  console.log('2nd method Updating ');
  
  
    const url='http://localhost:5000/users';
    
    let promise=fetch(url)

    promise.then((response)=>{
      return response.json()
    }).then((data)=>{

      if(Array.isArray(data)){
        this.setState({
          users:data
        })
      }
    }).catch((error)=>{
      console.log(error)
    })

 }
  render() {
    return (
        <div className="row">
          
                    <div className="col-sm-8 mx-auto text-dark p-5">
                      <h1>Show User</h1>
                    {this.state.msg}
                        <table className="table table-bordered" >
                            <thead className="text-center text-dark bg-secondary fs-4">
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile no</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </thead>
                            <tbody className="text-dark text-center">
                                {this.getRecords()}
                            </tbody>
                        </table>
                    </div>
                </div> 
    )
  }
  getRecords=()=>{
    
    var arr=this.state.users
    return arr.map((item,index)=>{
     return (
      <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.mobile}</td>
      <td><button type='button' onClick={()=>{this.editUser(item.id)}} className='btn btn-success'>Edit</button></td>
      
       <td> <button type='button' onClick={()=>{this.deleteUser(item.id,index)}} className='btn btn-danger '>Delete</button>
      </td>
     </tr>
     )
     
    })
  }
  deleteUser=(id,index)=>{
      if(window.confirm('Are you sure to delete')){
        //fetch api

        const url=' http://localhost:5000/users/'+id;

    

    let promise=fetch(url,{
      headers:{
        'Content-Type':'application/json'
      },
      method:'DELETE',
    })
    
    promise.then((response)=>{
      if(response.ok){
        let userData=[...this.state.users]
        userData.splice(index,1);
        this.setState({
          users:userData,
          msg:<span className='alert alert-success'>Deleted successfully</span>
      });

      setTimeout(() => {
        this.setState({
         msg:""
        });
      },3000);

      return redirect('showuser');
      }


    }).then((data)=>{
      console.log(data)
    }).catch((error)=>{
      console.log(error);

      this.setState({
        msg:<span className='alert alert-danger'>OOPS Try Again</span>
      });
      // let ID1=setTimeout(() => {
      //   this.setState({
      //     msg:""
      //   })
      // },5000);
      
    });
      }

  }
  editUser=(id)=>{
    // console.log(id)
    return redirect('edituser/'+id)
        
  }
}
  
