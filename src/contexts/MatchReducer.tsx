import { useReducer } from "react";

export const initialState = {
    matchInfo: {},
    firstInning: {},
    secondInning: {}
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
        default:
            return state
    }
}

export default MatchReducer