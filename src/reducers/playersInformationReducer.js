import matchConstants from "../constants/matchConstants";
const initialState = {
    teamPlayers:{}
};
  
export default function playersInformationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (action.type) {
        case matchConstants.PLAYERS_API_SUCCESS:
            return {
                ...state,
                teamPlayers:payload.data
            }
        default:
            return state
    }
}
  