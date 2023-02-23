import { updatePlayerStat } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data) => {
    return {
        type: matchConstants.UPDATE_PLAYER_STATS,
        payload: data,
    };
};

const getCurrentPlayerScore= (id,matchId) =>{
    return async(dispatch) => {
        return await updatePlayerStat(id,matchId,{})
        .then(res => { 
            console.log("From get player score ",res)
            dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}
export default getCurrentPlayerScore;
