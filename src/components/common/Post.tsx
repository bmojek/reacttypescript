import React, { FC, useState } from 'react';
import { UserType } from '../types/User.type';
import { PostType } from '../types/Post.type';
import { CommentType } from '../types/Comment.type';
import { useAuth } from '../contexts/AuthContext';
import { useApiContext } from '../contexts/ApiContext';

type MergedPostType = PostType & { user: UserType; comments: CommentType[] };

interface PostProps {
  post: MergedPostType;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}
const Post: FC<PostProps> = ({ post,setComments }) => {
  
  const { user } = useAuth();
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const {users} = useApiContext()
  const foundUser = users.find((u) => u.username === user?.username);
  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };
  const allComments = post.comments.slice().reverse();
  const visibleComments = showAllComments ? allComments : allComments.slice(0, 2);

  const handleAddComment = (event:React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const newCommentData: CommentType = {
      postId: post.id,
      id: post.comments.length + 1,
      name: user?.username,
      email: foundUser?.email || "/",
      body: newComment,
    };
    
    setComments((prevComments) => [...prevComments, newCommentData]);
    setNewComment('');
  };
  return (
    
    <div className="post">
      <img src="https://via.placeholder.com/150/771796" alt="Placeholder" />
      <h1>{post.user.username}</h1>
      <h2>{post.body}</h2>
      <p id='comCount' onClick={toggleComments}>{post.comments.length} komentarzy</p>
      <form onSubmit={(e) =>handleAddComment(e)}>
        <input id='addComm' placeholder='Dodaj komentarz' value={newComment} onChange={(e) =>setNewComment(e.target.value)}></input>
      </form>
      
      {visibleComments.map((comment) => (
        <div className="comment" key={comment.id}>
          <p><b>{comment.name}</b> /<i>{comment.email}</i></p>
          <span>{comment.body}</span>
        </div>
      ))}
  
      {post.comments.length > 2 && (
        <button onClick={toggleComments}>
          {showAllComments ? 'Ukryj komentarze' : 'Pokaż wszystkie komentarze'}
        </button>
      )}
      
    </div>
    
  );
  
};

export default Post;
