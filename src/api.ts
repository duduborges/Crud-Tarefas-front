import axios from "axios";

export const Api = axios.create({
     baseURL: "https://crud-tarefas-backend.vercel.app/"
})