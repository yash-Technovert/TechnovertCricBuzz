import { getPlayers } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data,isTeamOne) => {
    if(isTeamOne){
        return {
            type: matchConstants.TEAM_ONE_API_SUCCESS,
            payload: data,
        };
    }
    return {
        type: matchConstants.TEAM_TWO_API_SUCCESS,
        payload: data,
    };
};

const getPlayersDetails= (teamId,isTeamOne) =>{
    return async(dispatch) => {
        return await getPlayers(teamId)
        .then(res => { 
            console.log("FroM GET PLAYERS Action ",res)
            dispatch(successInApiCall(res,isTeamOne));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}

export default getPlayersDetails;
