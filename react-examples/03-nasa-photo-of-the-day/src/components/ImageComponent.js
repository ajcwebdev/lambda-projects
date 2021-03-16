import React, { useState, useEffect } from "react";
import ImageContainer from "./ImageContainer";
import axios from "axios";

function ImageComponent() {

const [image, setImage] = useState({});

useEffect(() => {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=E6YTMCqadu6CnauVmkPiR2hi6g0VcxsC0Is0M7D6`)
    .then(response => setImage(response.data))
    .catch(error => console.log("ERROR: ", error));
}, []);
return (
  <div>
      <ImageContainer image={image}/>
  </div>
  )
}
export default ImageComponent
