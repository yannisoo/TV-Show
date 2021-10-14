import React, { useState, ChangeEvent } from "react";
import './home.css';
import {
  Link
} from "react-router-dom";
import HomeService from "../services/ShowServices";
import Show from "../types/ShowType";



const Home: React.FC = () => {
  
  const [shows, setShows] = useState<Array<Show>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTitle(searchValue);
    if (searchValue.length >= 3){
      search(searchValue)
    }
  };
  const search = (searchValue: string) => {
    HomeService.get(searchValue).then(response => setShows(response.data)
      )
  }
  return (
    <div>
      <div className="searchBar">
        <input
        type="text"
        data-testid="search"
        className="form-control"
        placeholder="Search a show"
        value={searchTitle}
        onChange={onChangeSearchTitle}
        />
      <button  >
        Search
      </button>

      </div>
    <h4>Shows</h4>

      <div className="list-group">

      {shows.map((item) => (
      <Link to={`show/${item.show.id}`} key={item.show.id}>
        <div className="item"  >
          <h5>{item.show.name}</h5>
          {item.show.image &&
            <img src={item.show.image.medium} alt={item.show.name} />
          }
          {item.show.image === null &&
          <img src="https://variety.com/wp-content/uploads/2021/02/List-Placeholder-Image-Unavailable.jpg" alt="unknown" />
          }
        </div>
      </Link>
      ))}
    </div>

    
    </div>
    
  )
}


export default Home;