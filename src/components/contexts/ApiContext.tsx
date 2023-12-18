import { createContext,useState,ReactNode,useEffect,useContext } from "react";
import { UserType } from "../types/User.type";
import { PostType } from "../types/Post.type";
import { CommentType } from "../types/Comment.type";

interface ApiContextProps {
  users?: UserType[];
  setUsers?: React.Dispatch<React.SetStateAction<UserType[]>>;
  posts?:PostType[];
  setComments?:React.Dispatch<React.SetStateAction<CommentType[]>>;
  setPosts?:React.Dispatch<React.SetStateAction<PostType[]>>;
  comments?:CommentType[];
}

const ApiContext = createContext<ApiContextProps>({});

  
export const ApiProvider:React.FC<{children: ReactNode}> = ({children}) =>{

  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] =  useState<UserType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);


  const newuser: UserType = {
    id: 11,
    name: "admin",
    email: "admin@gmail.com",
    website: "admin",
    username: "admin",
  };
  
  const fetchData = async () => {
    try {
      console.log("fer")
      const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
      const usersJson = await usersResponse.json();
      setUsers([...usersJson, newuser]);

      const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
      const postsJson = await postsResponse.json();
      setPosts(postsJson);

      const commentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments");
      const commentsJson = await commentsResponse.json();
      setComments(commentsJson);
      

      
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    
    fetchData();
    
  }, []);


    return(
      
      <ApiContext.Provider value={{users,setUsers,posts,setComments,setPosts,comments}}>
        {children}
      </ApiContext.Provider>
    )
}

export function useApiContext(){
  const {users, setUsers,posts,setComments,setPosts,comments} = useContext(ApiContext) || {}
  if(users === undefined || posts === undefined  || setPosts === undefined || setComments === undefined || comments===undefined){
    throw new Error('u have to wrap by ApiProvider')
  }
  return {users,setUsers,posts,setComments,setPosts,comments}
}

export default ApiContext;
