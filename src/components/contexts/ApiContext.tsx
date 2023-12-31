import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { UserType } from "../types/User.type";
import { PostType } from "../types/Post.type";
import { CommentType } from "../types/Comment.type";
import { PhotoType } from "../types/Photo.type";
import { AlbumType } from "../types/Album.type";

interface ApiContextProps {
  users?: UserType[];
  setUsers?: React.Dispatch<React.SetStateAction<UserType[]>>;
  posts?: PostType[];
  setComments?: React.Dispatch<React.SetStateAction<CommentType[]>>;
  setPosts?: React.Dispatch<React.SetStateAction<PostType[]>>;
  comments?: CommentType[];
  photos?: PhotoType[];
  albums?: AlbumType[];
}

const ApiContext = createContext<ApiContextProps>({});
export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const newuser: UserType = {
      id: 11,
      name: "admin",
      email: "admin@gmail.com",
      website: "admin",
      username: "admin",
    };

    const fetchData = async () => {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersJson = await usersResponse.json();
        setUsers([...usersJson, newuser]);

        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsJson = await postsResponse.json();
        setPosts(postsJson);

        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsJson = await commentsResponse.json();
        setComments(commentsJson);
        const photoResponse = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const photoJson = await photoResponse.json();
        setPhotos(photoJson);
        const albumResponse = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const albumJson = await albumResponse.json();
        setAlbums(albumJson);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        users,
        setUsers,
        posts,
        setComments,
        setPosts,
        comments,
        photos,
        albums,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export function useApiContext() {
  const {
    users,
    setUsers,
    posts,
    setComments,
    setPosts,
    comments,
    photos,
    albums,
  } = useContext(ApiContext) || {};
  if (
    !users ||
    !posts ||
    !setPosts ||
    !setComments ||
    !comments ||
    !photos ||
    !albums ||
    !setUsers
  ) {
    throw new Error("u have to wrap by ApiProvider");
  }
  return {
    users,
    setUsers,
    posts,
    setComments,
    setPosts,
    comments,
    photos,
    albums,
  };
}

export default ApiContext;
