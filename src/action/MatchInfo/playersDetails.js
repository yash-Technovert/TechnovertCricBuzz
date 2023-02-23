import { getPlayers } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data) => {
    return {
        type: matchConstants.PLAYERS_API_SUCCESS,
        payload: data,
    };
};

const getPlayersDetails= (teamId) =>{
    return async(dispatch) => {
        return await getPlayers(teamId)
        .then(res => { 
            console.log("FroM GET PLAYERS Action ",res)
            //dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}
export default getPlayersDetails;
