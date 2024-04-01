import axios from "axios";

// Ensures cookie is sent
axios.defaults.withCredentials = true;

//const serverUrl = process.env.REACT_APP_SERVER_URL;

export default axios.create({
    //baseURL: process.env.REACT_APP_SERVER_URL
    baseURL: "http://localhost:8080/api",
    //baseURL: "https://api.money.turbobutterfly.com/api",
    //headers: {
    //    "Content-type": "application/json"
    //}
});
