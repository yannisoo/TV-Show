  
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';
import './show.css'
import ShowService from "../services/ShowServices";
import ShowSingle from "../types/ShowType";
import MyShowsService from "../services/MyShowsServices";

interface RouterProps { 
  id: string; 
}

type Props = RouteComponentProps<RouterProps>;

const Show: React.FC<Props> = (props: Props) => {
  const [currentShow, setCurrentShow] = useState<ShowSingle>();
  const [savedShow, setSavedShow] = useState<any>(null);

  const getShow = (id: string) => {
    ShowService.findById(id)
      .then(async response => {
        await MyShowsService.isThisShowSaved(id).then( MyShows => {
          setSavedShow(MyShows.data);
          console.log(savedShow);
        })
        setCurrentShow(response.data);
      })  
      .catch(e => {
        console.log(e);
      });
  };
  const changeSeen = () => {
    MyShowsService.changeSeen(props.match.params.id)
      .then(response => {
        setSavedShow((prevState: { completed: boolean; }) => ({
          completed: !prevState.completed,     
          }));
      })
      .catch(e => {
        console.log(e);
      });
  }
  const ChangeShowState = () => {
    if(!savedShow){
      MyShowsService.addMyShows(
        {
          "showId": props.match.params.id,
          "seen": false 
        })
      .then(response => {
        setSavedShow(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      MyShowsService.deleteMyShow(props.match.params.id)
      .then(response => {
        setSavedShow(null);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }
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
          <div className="myZone">
          {savedShow &&
            <img onClick={ChangeShowState} className="like liked" src="https://icon-library.com/images/black-heart-icon-png/black-heart-icon-png-28.jpg" alt="" />
          }
          {!savedShow &&
            <img onClick={ChangeShowState} className="like" src="https://icon-library.com/images/black-heart-icon-png/black-heart-icon-png-28.jpg" alt="" />
          }    
          {savedShow?.completed &&
          <img onClick={changeSeen} className="like" src="https://static.thenounproject.com/png/203982-200.png" alt="" />
          }
          {!savedShow?.completed &&
            <img onClick={changeSeen} className="like" src="https://image.flaticon.com/icons/png/512/98/98494.png" alt="" />
          }
            
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