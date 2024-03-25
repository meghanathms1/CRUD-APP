import "./edit.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams,  useNavigate } from "react-router-dom";
import axios from "axios";
import toast from  "react-hot-toast"

const Edit = () => {
    const initialUser = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    };

    const { id } = useParams();
    const navigate = useNavigate()
    const [user, setUser] = useState(initialUser);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8001/api/getone/${id}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async(e) => {
      e.preventDefault()
      await axios.put(`http://localhost:8001/api/update/${id}` ,user)
      .then((response)=>{
          console.log(response)
          toast.success(response.data.msg ,{position:"top-right"})
           navigate("/")
      }).catch(error =>console.log(error))
    };

    return (
        <div className="addUser">
            <Link to={"/"}>Back to Home</Link>
            <h3>Update User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First name</label>
                    <input type="text" id="fname" name="fname" value={user.fname} autoComplete="off" onChange={inputChangeHandler} placeholder="First name" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Last name</label>
                    <input type="text" id="lname" name="lname" value={user.lname} autoComplete="off" onChange={inputChangeHandler} placeholder="Last name" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={user.email} autoComplete="off" onChange={inputChangeHandler} placeholder="Email" />
                </div>
                <div className="inputGroup">
                    <button type="submit">UPDATE USER</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
