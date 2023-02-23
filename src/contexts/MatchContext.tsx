import React, { createContext, useContext, useReducer } from 'react';
import MatchReducer, { initialState } from './MatchReducer';
import { InningStatResponse } from '../models/Innings';

export const MatchContext = createContext(initialState)

export const MatchProvider = (props: any) => {
    const [state, dispatch] = useReducer(MatchReducer, initialState)

    const value = {
        matchInfo: state.MatchInfo,
        firstInning: state.firstInning,
        secondInning: state.secondInning,
        teamOne: state.teamOne,
        teamTwo: state.teamTwo,
        currentOver: state.currentOver,
        matchId: state.matchId,
    }
    return (
        <MatchContext.Provider value={value}>
            {props.children}
        </MatchContext.Provider>
    )
}




