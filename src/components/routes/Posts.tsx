import React, { useState, useEffect } from "react";
import Loader from "../common/Loader";
import Post from "../common/Post";
import "../style/Posts.css";
import { PostType } from "../types/Post.type";
import { UserType } from "../types/User.type";

export const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [error, setError] = useState([]);
    const [users, setUsers] = useState<UserType[]>([]);
    
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setUsers(json))
        .catch((err) => setError(err));
  
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setPosts(json))
        .catch((err) => setError(err));
    }, []);
  
    type MergedPostType = PostType & { user: UserType };
  

    const mergePostsAndUsers = (): MergedPostType[] => {
      return posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        return {
          ...post,
          user: user || ({} as UserType) 
        };
      });
    };
  
    const postsWithUsers = mergePostsAndUsers();
  
    return (
      <div className="posts-container">
        {posts.length === 0 ? (
          <Loader />
        ) : (
          postsWithUsers.map((post, index) => (
            <Post key={post.id} index={index} post={post} />
          ))
        )}
      </div>
    );
  };