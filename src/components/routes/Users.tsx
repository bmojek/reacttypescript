import React,{useState,useEffect} from "react"
import { UserType } from "../types/User.type"
import Loader from "../common/Loader"
import User from "../common/User"
import "../style/Users.css"


export const Users = () =>{
    const [users, setUsers] = useState([])
    const [error, setError] = useState([])

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json))
        .catch(err => setError(err))
    },[])


    return(
        <div className="users">
            {users.length > 0 ? 
            users.map((user:UserType, index) => <User user = {user} index={index} key={index}/>)
            : (<Loader/>)}
        </div>
    );   
}

