import axios from "axios";

export default axios.create({
  headers: {
    "Content-type": "application/json",
    "autorization": "Bearer " + localStorage.getItem("token")
  }
});