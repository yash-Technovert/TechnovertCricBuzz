import React, { createContext, useReducer } from 'react';
import MatchReducer, { initialState } from './MatchReducer';
import { getScores } from '../api/match';
import { InningStatResponse } from '../models/Innings';

export const MatchContext = createContext(initialState)

export const MatchProvider = (props: any) => {
    const [state, dispatch] = useReducer(MatchReducer, initialState)

    const getScore= async (id:string,matchId:string) => {
        const response = await getScores(id,matchId)
        .then((res) =>{
            console.log(res.data)
            setInningStat(res.data)
        })
    }


    const setMatch = (match:any) => {
        dispatch({
            type: 'SET_MATCH',
            payload: match
        })
    }

    const setInningStat = (inningStat:any) => {
        dispatch({
            type: 'SET_INNING_STAT',
            payload: inningStat
        })
    }

    return (
        <MatchContext.Provider value={{
            Match: state.Match,
            inningStat: state.inningStat,
            // setMatch,
            // setInningStat,
        }}>
            {props.children}
        </MatchContext.Provider>
    )
}



