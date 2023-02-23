import teamConstants from "../constants/teamConstants";

const initialState = {
  teams:"",
};

export default function preferredProviderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case teamConstants.TEAM_GET_API_SUCCESS:
        return {
            ...state,
            teams:payload.data
        };
    default:
      return state;
  }
}
