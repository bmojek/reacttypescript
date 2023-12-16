import React, { useState, useEffect } from "react";
import Loader from "../common/Loader";
import Post from "../common/Post";
import "../style/Posts.css";
import { PostType } from "../types/Post.type";
import { UserType } from "../types/User.type";
import { CommentType } from "../types/Comment.type";

export const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [inputValue, setinputValue] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(10);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 10);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((err) => setError(err));

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((err) => setError(err));

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((json) => setComments(json))
      .catch((err) => setError(err));
  }, []);
  if(error.length>0) console.log(error); 
  type MergedPostType = PostType & { user: UserType; comments: CommentType[] };

  const mergePostsUsersComment = (): MergedPostType[] => {
    return posts.map((post) => {
      const user = users.find((u) => u.id === post.userId);
      const postComments = comments.filter((comment) => comment.postId === post.id);
      return {
        ...post,
        user: user || ({} as UserType),
        comments: postComments || [],
      };
    });
  };

  const getMaxId = () => {
    return posts.reduce((maxId, post) => (post.id > maxId ? post.id : maxId), 0);
  }
  
  const handleOnSubmit = (event:React.FormEvent<HTMLFormElement>,value : string) =>{
    event?.preventDefault()
      
      const newPost:PostType ={
        id:getMaxId()+1,
        userId:1,
        body:value,
        title:"Title"
      }
      setPosts((posts)=>[...posts,newPost])
      setinputValue('')
  }

  const postsWithUsers = mergePostsUsersComment().reverse()
  
  return (<>
    <div className='addPost'>
      <h4>Dodaj post</h4>
      <form onSubmit={(e) => handleOnSubmit(e,inputValue)}>
        <input type="text" name="dodajPost" value={inputValue} onChange={(e) => setinputValue(e.target.value)} placeholder="Dodaj wpis"></input>
      </form>
    </div>
    <div className="posts-container">
      {posts.length === 0 ? (
        <Loader />
      ) : (
        postsWithUsers.slice(0,visiblePosts).map((post, index) => (
          <Post key={post.id} index={index} post={post} setComments={setComments}/>
        ))
      )}
    </div>
    </>
  );
};
