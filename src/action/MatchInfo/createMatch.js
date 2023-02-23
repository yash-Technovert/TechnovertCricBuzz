import { createMatch } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data) => {
    return {
        type: matchConstants.CREATE_MATCH_API_SUCCESS,
        payload: data,
    };
};

const createMatchAPI= (matchDetails,token) =>{
    return async(dispatch) => {
        return await createMatch(matchDetails,token)
        .then(res => { 
            console.log("From create Match Action ",res)
            dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}
export default createMatchAPI;
