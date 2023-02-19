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

export async function getScores(id:string,matchId:string){
    return await axios({
        method: 'get',
        url: baseUrl+'getscore',
        params:{
            id:id,
            matchId:matchId
        }
    })
}

export async function updateScore(id:string,updates:any)
{
    return await axios({
        method: 'put',
        url: baseUrl+'updatescore',
        params:{
            inningId:id
        },
        data:{updates}
    })
}