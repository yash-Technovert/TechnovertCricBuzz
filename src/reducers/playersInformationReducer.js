import matchConstants from "../constants/matchConstants";
const initialState = {
    playersStats:{}
};
  
export default function playersInformationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (action.type) {
        case matchConstants.GET_PLAYING_PLAYERS_STATS:
            return {
                ...state,
                playersStats:payload.data
            }
        default:
            return state
    }
}
  