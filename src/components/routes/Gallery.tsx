import React,{useState,useEffect} from "react";
import Loader from "../common/Loader";
import Photo from "../common/Photo";
import { PhotoType } from "../types/Photo.type";

export const Gallery = () =>{
    const [photos, setPhotos] = useState([])
    const [error, setError] = useState([])

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setPhotos(json.slice(0,20)))
        .catch(err => setError(err))
    },[])
    return(
        <div className="App">
            {photos.length > 0 ? 
            photos.map((photo:PhotoType) => <Photo photo = {photo}/>)
            : (<Loader/>)}
            
        </div>
    );
       
    
}