import axios from "axios";

export default axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "https://api.money.turbobutterfly.com/api",
    headers: {
        "Content-type": "application/json"
    }
});