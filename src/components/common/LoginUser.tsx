import React, { FC } from "react";
import { UserType } from "../types/User.type";

interface Props{
    user : UserType;
    index : number
}

const LoginUser:FC<Props> = ({user,index}) =>{
    
    return(
            <>
                {user}
            </>  
    )
}

export default LoginUser