import { FC } from "react";
import Layout from '../common/Layout'
import "../style/App.css"
import { ApiProvider } from "../contexts/ApiContext";
import { AuthProvider } from "../contexts/AuthContext";

export const App: FC = () =>{
  return(
    <ApiProvider>
      <AuthProvider>
        <Layout/>
      </AuthProvider>
    </ApiProvider>
  );
}


