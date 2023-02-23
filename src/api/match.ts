import axios from "axios";
import { InningStatResponse } from "../models/Innings";
import { CreateMatch } from "../models/Match";

const baseUrl="http://localhost:3000/";

export async function createTeam(teamName:string)
{
    return await axios({
        method: 'post',
        url: baseUrl+'createteam',
        data:{teamName}
    })
}

export async function getTeams()
{
    return await axios({
        method: 'get',
        url: baseUrl+'getteams',
    })
}

export async function createMatch(matchDetails:any)
{
    console.log("Match Details form axios",matchDetails)
    const result = await axios({
        method: 'post',
        url: baseUrl+'creatematch',
        data:{matchDetails}
    })
    console.log("result from Create Match",result);
    return result;
}

export async function getMatches()
{
    return await axios({
        method: 'get',
        url: baseUrl+'getmatches',
    })
}

export async function getPlayers(teamId:string){
    return await axios({
        method: 'get',
        url: baseUrl+'getplayers',
        params: {
            teamId: teamId
        }
    })
}

export async function getMatchInfo(id:string){
    return await axios({
        method: 'get',
        url: baseUrl+'getmatchinfo',
        params:{
            id:id
        }
    })
}



export async function getScore(matchId:string){
    return await axios({
        method: 'get',
        url: baseUrl+'getscore',
        params:{
            matchId:matchId
        }
    })
}

export async function updateScore(id:string,updates:any)
{
    return await axios({
        method: 'put',
        url: baseUrl+'updatescore',
        data:{
            updates:updates,
            inningId:id
        }
    })
}