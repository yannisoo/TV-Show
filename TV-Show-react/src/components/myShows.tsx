  
import React, { useState, useEffect } from "react";
import { Link,  } from 'react-router-dom';
import './show.css'
import ShowService from "../services/ShowServices";
import MyShowsServices from "../services/MyShowsServices";
import ShowSingle from "../types/ShowType";




const MyShows: React.FC = () => {
    const [shows, setShows] = useState<Array<ShowSingle>>([]);
    
    const getShow = () => {
        MyShowsServices.getMyShows()
        .then(response => {         
            var currentArray: ShowSingle[] = [];
            response.data.forEach( async (item: { showId: string; }) => {
                await ShowService.findById(item.showId).then(response => {
                    currentArray = currentArray.concat(response.data)
                    setShows(currentArray);
                
                })
            });
        })
        .catch(e => {
            console.log(e);
        });
    };



    useEffect(() => {
            getShow();
    }, []);
    return(
    <div>
        <h4>My shows</h4>

    <div className="list-group">

        {shows.map((item) => (
            <Link to={`show/${item.id}`} key={item.id}>
            <div className="item"  >
                <h5>{item.name}</h5>
                {item.image &&
                <img src={item.image.medium} alt={item.name} />
                }
                {item.image === null &&
                <img src="https://variety.com/wp-content/uploads/2021/02/List-Placeholder-Image-Unavailable.jpg" alt="unknown" />
                }
            </div>
            </Link>
        ))}
    </div>
    </div>
  )
 
}
export default MyShows;