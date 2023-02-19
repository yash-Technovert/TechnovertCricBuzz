import axios from "axios";
import { InningStatResponse } from "../models/Innings";

const baseUrl="http://localhost:3000/";

export async function getMatchInfo(id:string){
    return await axios({
        method: 'get',
        url: baseUrl+'getmatchinfo',
        params:{
            id:id
        }
    })
}