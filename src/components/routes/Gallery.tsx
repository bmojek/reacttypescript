import React,{useState,useEffect} from "react";
import Loader from "../common/Loader";
import Photo from "../common/Photo";
import "../style/Gallery.css"
import { PhotoType } from "../types/Photo.type";

export const Gallery = () =>{
    const [photos, setPhotos] = useState([])
    const [error, setError] = useState([])

    useEffect(() =>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setPhotos(json))
        .catch(err => setError(err))
    },[])
    return(
        <div className="Gallery">
            {photos.length > 0 ? 
            photos.map((photo:PhotoType, index) => <Photo photo = {photo} index = {index} key={index}/>)
            : (<Loader/>)}
        </div>
    );   
}