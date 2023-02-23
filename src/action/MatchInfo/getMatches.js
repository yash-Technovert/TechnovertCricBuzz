import { getMatches } from "../../api/match";
import matchConstants from "../../constants/matchConstants";
const successInApiCall = (data) => {
    return {
        type: matchConstants.GET_MATCH_API_SUCCESS,
        payload: data,
    };
};

const getMatchesAPI = () =>{
    return async(dispatch) => {
        return await getMatches()
        .then(res => { 
            console.log("From get Matches Action ",res)
            dispatch(successInApiCall(res));
            return res;
        }).catch((e) => {
            throw e;
        });
    };
}
export default getMatchesAPI;
