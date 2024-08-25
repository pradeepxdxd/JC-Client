import axios from "axios";
import { BASE_URL } from "../dev";

export default axios.create({
    baseURL : BASE_URL,
})