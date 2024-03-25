import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";

const User = () => {
  const [user, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      
      const responce = await axios.get("http://localhost:8001/api/getAll");
      setUsers(responce.data);
    };
    fetchData();
  }, [])

  const deleteUser = async(userId)=>{
    await axios.delete(`http://localhost:8001/api/delete/${userId}`)
    .then((response)=>{
      console.log(response)
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.NO.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {user.fname} {user.lname}
              </td>
              <td>{user.email}</td>
              <td className="actionButton">
                <button onClick={()=>{deleteUser(user._id)}}>Delete</button>
                <Link to={`/Edit/${user._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
