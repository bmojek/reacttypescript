import React, { FC } from "react";
import { PostType } from "../types/Post.type";
import { UserType } from "../types/User.type";
import { CommentType } from "../types/Comment.type";

type MergedPostType = PostType & { user: UserType; comments: CommentType[] };
interface Props{
    post : MergedPostType;
    index : number;
}

const Post:FC<Props> = ({post,index}) =>{
    
    return(
            <>
                <h1>Autor: {post.user.username}</h1>
                <h2>Post body: {post.body}</h2>
                
                {post.comments.map((comment) => (
                <div key={comment.id}>
                    Komentujacy: <b>{comment.name} </b><br></br>
                    Koment body: {comment.email}
                    <hr></hr>
                </div>
                ))}
                <br></br>
            </>  
    )
}

export default Post