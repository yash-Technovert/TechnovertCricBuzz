import { useReducer } from "react";

export let initialState = {
    Match:{
        id:'',
        teamOne:'',
        teamTwo:'',
        tossWinner:'',
        tossDecision:'',
    },
    inningStat:{
        id: '',
        teamName: '',
        runsScored: 0,
        wickets: 0,
        oversPlayed: 0.0.toPrecision(1),
        isFirstInning: '',
        extras:{
            wide:0,
            noBall:0,
            bye:0,
            legBye:0,
        },
        matchId: '',
        four: 0,
        six: 0,
    }
}

const MatchReducer = (state:any, action:any) => {
    switch(action.type){
        case 'SET_MATCH':
            return{
                ...state,
                Match:action.payload
            }
        case 'SET_INNING_STAT':
            return{
                ...state,
                inningStat:action.payload
            }
        default:
            return state
    }
}

export default MatchReducer