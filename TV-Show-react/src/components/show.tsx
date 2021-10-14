  
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';
import './show.css'
import ShowService from "../services/ShowServices";
import ShowSingle from "../types/ShowType";

interface RouterProps { 
  id: string; 
}

type Props = RouteComponentProps<RouterProps>;

const Show: React.FC<Props> = (props: Props) => {
  const [currentShow, setCurrentShow] = useState<ShowSingle>();

  const getShow = (id: string) => {
    ShowService.findById(id)
      .then(response => {
        setCurrentShow(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getShow(props.match.params.id);
  }, [props.match.params.id]);


  return(
    <div>
    {currentShow ?(
    <div>
      <div className="holder">
        <div className="title">
        {currentShow.image &&
          <img src={currentShow.image.original} alt={currentShow.name} />
          }
        </div>
        <div className="info">
          
        <h2>{currentShow.name}</h2>
        <p>Premiered: {currentShow.premiered}</p>
        
        <p>Rating: {currentShow.rating.average} </p>
        {currentShow.genres.map((genre, index) => (
          <span key={index}>{genre} </span>
        ))}
        </div>
          <div className="description">
            <h3>Description:</h3>
            <div  dangerouslySetInnerHTML={{ __html: currentShow.summary }} />

          </div>
      </div>


    </div>
    ): (
      <div>
        <br />
        <p>Chargement en cours...</p>
      </div>
    )}
    </div>
  )
 
}
export default Show;