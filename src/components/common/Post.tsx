import React, { FC } from "react";
import { PostType } from "../types/Post.type";
import { UserType } from "../types/User.type";

type MergedPostType = PostType & { user: UserType };
interface Props{
    post : MergedPostType;
    index : number;
}

const Post:FC<Props> = ({post,index}) =>{
    
    return(
            <>
                <hr></hr>
                {post.user.username}
                {post.body}
                <br></br>
            </>  
    )
}

export default Post