import { useReducer } from "react";

export const initialState = {
    matchInfo: {},
    firstInning: {},
    secondInning: {},
    teamOne: {},
    teamTwo: {},
    currentOver: [],
    matchId:''
}


const MatchReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_MATCH":
            state.matchInfo = action.payload.matchInfo;
            return state;
        case "SET_FIRSTINNING":
            state.firstInning = action.payload.firstInning;
            return state;
        case "SET_SECONDINNING":
            state.secondInning = action.payload.secondInning;
            return state;
        case "SET_TEAMONE":
            state.teamOne = action.payload.teamOne;
            return state;
        case "SET_TEAMTWO":
            state.teamTwo = action.payload.teamTwo;
            return state;
        case "UPDATE_CURRENT_OVER":
            state.currentOver = action.payload.currentOver;
            return state;
        case "SET_MATCH_ID":
            state.matchId = action.payload.matchId;
            return state;
        default:
            return state
    }
}

export default MatchReducer