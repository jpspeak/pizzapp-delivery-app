import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:1337/api"
});

export default http;
