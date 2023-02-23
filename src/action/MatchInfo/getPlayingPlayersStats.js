import { getPlayerState } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data) => {
    return {
        type: matchConstants.GET_PLAYING_PLAYERS_STATS,
        payload: data,
    };
};

const getPlayersStats= (matchId) =>{
    return async(dispatch) => {
        return await getPlayerState(matchId)
        .then(res => { 
            dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}
export default getPlayersStats;
