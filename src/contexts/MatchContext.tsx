import React, {createContext} from 'react';
import { InningStatResponse } from '../models/Innings';

export const MatchContext = createContext<InningStatResponse>(
    {
        id:'',
        matchId:'',
        isFirstInning:true,
        runsScored:0,
        wickets:0,
        oversPlayed:0,
        extras:{
            wide:0,
            noBall:0,
            bye:0,
            legBye:0,
        },
        four:0,
        six:0,
        teamName:'',
    }
)


export const MatchProvider = (props:any)  => { 
    const temp:InningStatResponse = {
        id:'',
        matchId:'',
        isFirstInning:true,
        runsScored:0,
        wickets:0,
        oversPlayed:0,
        extras:{
            wide:0,
            noBall:0,
            bye:0,
            legBye:0,
        },
        four:0,
        six:0,
        teamName:'',
    }
    return(
        <MatchContext.Provider  value={temp}>
            {props.children}
        </MatchContext.Provider>
    )
}