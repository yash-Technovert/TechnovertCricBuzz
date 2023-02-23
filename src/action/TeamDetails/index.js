import { getTeams } from "../../api/match";
import teamConstants from "../../constants/teamConstants";
const successInApiCall = (data) => {
    return {
        type: teamConstants.TEAM_GET_API_SUCCESS,
        payload: data,
    };
};

const  TeamDetails= () =>{
    return async(dispatch) => {
        return await getTeams()
        .then(res => { 
            dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}


export default TeamDetails;
