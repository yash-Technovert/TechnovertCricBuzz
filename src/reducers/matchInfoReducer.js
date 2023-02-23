import matchConstants from "../constants/matchConstants";
const initialState = {
    matchInfo: {},
    firstInning: {},
    secondInning: {},
    teamOne: {},
    teamOnePlaying11:{},
    teamTwo: {},
    teamTwoPlaying11:{},
    currentOver: []
};
  
  export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (action.type) {
        case matchConstants.CREATE_MATCH_API_SUCCESS:
            return {
                ...state,
                matchInfo:payload.data.matchInfo[0],
                firstInning:payload.data.firstInning[0]
            }
        case "SET_MATCH":
            state.matchInfo = action.payload.matchInfo;
            return state;
        case "SET_FIRSTINNING":
            state.firstInning = action.payload.firstInning;
            return state;
        case "SET_SECONDINNING":
            state.secondInning = action.payload.secondInning;
            return state;
        case matchConstants.SET_TEAMONE:
            return {
                ...state,
                teamOne:payload.teamOne,
                teamOnePlaying11:payload.teamOnePlayers
            }
        case matchConstants.SET_TEAMTWO:
            return {
                ...state,
                teamTwo:payload.teamTwo,
                teamTwoPlaying11:payload.teamTwoPlayers
            }
        case "UPDATE_CURRENT_OVER":
            state.currentOver = action.payload.currentOver;
            return state;
        default:
            return state
    }
  }
  