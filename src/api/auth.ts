import  axios from "axios";
import { User } from "../models/User";

const baseUrl = "http://localhost:3000/";

export async function login(username: string, password: string) {
  return await axios.post(`${baseUrl}login`, { username, password });
}

export async function signup(userData:User){
    return await axios.post(`${baseUrl}signup`,userData);
}

