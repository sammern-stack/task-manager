import axios from "axios";
import { axiosConfig } from "@/config/axios.config";

const api = axios.create(axiosConfig);

export default api;
