import React, { createContext, useContext, useReducer } from 'react';
import MatchReducer, { initialState } from './MatchReducer';
import { InningStatResponse } from '../models/Innings';

export const MatchContext = createContext(initialState)

export const MatchProvider = (props: any) => {
    const [state, dispatch] = useReducer(MatchReducer, initialState)

    const setFirstInning = (inningStat: InningStatResponse) => {
        dispatch({
            type: 'SET_FIRSTINNING',
            payload: {
                firstInning: inningStat
            }
        })
    }

    const setSecondInning = (inningStat: InningStatResponse) => {
        dispatch({
            type: 'SET_SECONDINNING',
            payload: {
                secondInning: inningStat
            }
        })
    }

    const value = {
        matchInfo: state.MatchInfo,
        firstInning: state.firstInning,
        secondInning: state.secondInning
    }
    return (
        <MatchContext.Provider value={value}>
            {props.children}
        </MatchContext.Provider>
    )
}




