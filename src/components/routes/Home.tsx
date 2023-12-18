import "../style/Home.css"
import { useAuth } from '../contexts/AuthContext';


export const Home = () =>{
    
    const {user} = useAuth()

    return(
         <div className="App">
           {user ? `Witaj ${user.username}` : ''}
        </div>

    );
       
    
}
