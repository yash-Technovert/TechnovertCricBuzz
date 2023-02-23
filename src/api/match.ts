import axios from "axios";
import { InningStatResponse } from "../models/Innings";
import { CreateMatch } from "../models/Match";

const baseUrl="http://localhost:8080/";

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
    return result;
}

export async function getPlayerState(matchId:any,inningId:any)
{
    return await axios({
        method: 'get',
        url: baseUrl+'getplayerstate',
        params:{
            id:inningId,
            matchId:matchId
        }
    })
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
            matchId:id
        }
    })
}

export async function getFinishedMatches(matchId:string)
{
    return await axios({
        method: 'get',
        url: baseUrl+'getfinishedmatches',
        params:{
            matchId:matchId
        }
    })
}

export async function updatePlayerStat(id:string,matchId:string,updates:object)
{
    return await axios({
        method: 'put',
        url: baseUrl+'updateplayerstat',
        data:{
            updates:updates,
            inningId:id,
            matchId:matchId
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

export async function updatePlayerStat(id: string, matchId: string, updates: object={}) {
    return await axios({
        method: 'put',
        url: baseUrl+'updatePlayerStat',
        data:{
            updates:updates,
            id:id,
            matchId: matchId
        }
    })
}

export async function getSelectedPlayers(matchId:string): Promise<any>{
    return await axios({
        method: 'get',
        url: baseUrl+'getselectedplayers',
        params:{
            matchId:matchId
        }
    })
}
