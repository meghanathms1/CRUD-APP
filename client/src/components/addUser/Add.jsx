import "./add.css"
import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"


const Add = () => {
     const users ={
          fname:"",
          lname:"",
          email:"",
          password:""
     }
     const navigate = useNavigate()
     const [user,setUser] =  React.useState(users)

     const inputHandiler = (e)=>{
        const {name,value} =  e.target;
        setUser({...user,[name]:value})
        console.log(user)
     }

     const submitForm = async(e)=>{
          e.preventDefault()
          await axios.post("http://localhost:8001/api/create",user)
          .then((response)=>{
              console.log(response)
              toast.success(response.data.msg ,{position:"top-right"})
               navigate("/")
          }).catch(error =>console.log(error))
              
 
     }
  return (
    
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add New User </h3>
      <form className="addUserForm" onSubmit={submitForm} >
        <div className="inputGroup">
             <label htmlFor="fname">First name</label>
             <input type="text" id="fname" name ="fname" autoComplete="off" onChange={inputHandiler} placeholder="frist name"></input>
        </div>
        <div className="inputGroup">
             <label htmlFor="lname">last name</label>
             <input type="text" id="lname" name="lname" autoComplete="off"onChange={inputHandiler} placeholder="last name"></input>
        </div>
        <div className="inputGroup">
             <label htmlFor="email">Email</label>
             <input type="email" id="email" autoComplete="off" name="email" onChange={inputHandiler}placeholder="Email"></input>
        </div>
        <div className="inputGroup">
             <label htmlFor="fname">Password</label>
             <input type="password" id="password" autoComplete="off" name="password" onChange={inputHandiler} placeholder="password"></input>
        </div>
        <div className="inputGroup">
             <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  )
}

export default Add
