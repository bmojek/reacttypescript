import React, { useState, useEffect } from "react";
import Loader from "../common/Loader";
import Post from "../common/Post";
import "../style/Posts.css";
import { PostType } from "../types/Post.type";
import { useAuth } from "../contexts/AuthContext";
import { useApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
import { MergedPostType } from "../types/MergedPost.type";
import { UserType } from "../types/User.type";

export const Posts = () => {
  const { setComments, posts, setPosts, users, comments, photos, albums } =
    useApiContext();
  const [inputValue, setinputValue] = useState("");
  const [mergePostsUsersComment, setMergePostsUsersComment] = useState<
    MergedPostType[]
  >([]);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 10);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mergePostsUsers = (): MergedPostType[] => {
      return posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );
        return {
          ...post,
          user: user || ({} as UserType),
          comments: postComments || [],
        };
      });
    };
    setMergePostsUsersComment(mergePostsUsers().reverse());
  }, [posts, users, comments]);

  const getMaxId = () => {
    return posts.reduce(
      (maxId, post) => (post.id > maxId ? post.id : maxId),
      0
    );
  };

  const handleOnSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    value: string
  ) => {
    event.preventDefault();
    const newPost: PostType = {
      userId: user?.id || NaN,
      id: (getMaxId() || 0) + 1,
      body: value,
      title: "Title",
    };
    setPosts((posts) => [...posts, newPost]);
    setinputValue("");
  };

  const postsWithUsers = mergePostsUsersComment;

  const getAvatarUrl = (userId: number): string | undefined => {
    const userAlbum = albums.find((album) => album.userId === userId);
    if (userAlbum) {
      const userPhotos = photos.filter(
        (photo) => photo.albumId === userAlbum.id
      );
      if (userPhotos.length > 0) {
        return userPhotos[0].url;
      }
    }
    return undefined;
  };
  return (
    <>
      <div className={`LoginLink ${user ? "display" : ""}`}>
        <p>Zaloguj się żeby zobaczyć Wpisy</p>
        <button onClick={() => navigate("../Login")}>Logowanie</button>
      </div>
      <div className={` ${user ? "" : "blur"}`}>
        <div className="addPost">
          <h4>Dodaj post</h4>
          <form onSubmit={(e) => handleOnSubmit(e, inputValue)}>
            <input
              type="text"
              name="dodajPost"
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              placeholder="Dodaj wpis"
            ></input>
          </form>
        </div>
        <div className="posts-container">
          {posts.length === 1 ? (
            <Loader />
          ) : (
            postsWithUsers
              .slice(0, visiblePosts)
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  avatarUrl={getAvatarUrl(post.userId)}
                  setComments={(comments) => setComments(comments || [])}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};
