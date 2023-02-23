import matchConstants from "../constants/matchConstants";
const initialState = {
    matchInfo: {},
    firstInning: {},
    secondInning: {},
    teamOne: {},
    teamOnePlaying11:{},
    teamTwo: {},
    teamTwoPlaying11:{},
    currentOver: [],
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
        case matchConstants.CHANGE_TEAMS:
            return {
                ...state,
                teamOne:payload.TeamTwoName,
                teamOnePlaying11:payload.teamTwoPlayers,
                teamTwo:payload.TeamOneName,
                teamTwoPlaying11:payload.teamOnePlayers
            }
        case matchConstants.TEAM_ONE_API_SUCCESS:
            return {
                ...state,
                teamOnePlaying11:payload.data
            }
        case matchConstants.TEAM_TWO_API_SUCCESS:
            return {
                ...state,
                teamTwoPlaying11:payload.data
            }
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
  