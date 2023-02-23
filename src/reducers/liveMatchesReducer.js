import matchConstants from "../constants/matchConstants";
const initialState = {
    live:[],
    finished:[]
};
  
export default function liveMatchInformationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (action.type) {
        case matchConstants.GET_MATCH_API_SUCCESS:
            const result = mapMatchDetails(payload.data);
            console.log("result",result);
            return {
                ...state,
                live:result.live,
                finished:result.finished
            }
        default:
            return state
    }
}
  
function mapMatchDetails(res){
     let live = [];
    let finished = [];
   res.map((match) => {
          if (match.matchWinner) {
            let completedMatch = {
              matchId: match.matchId,
              teamOne: match.teamOne,
              teamTwo: match.teamTwo,
              teamOneInningStat: {
                runsScored: match.teamOneRuns,
                wickets: match.teamOneWickets,
                oversPlayed: match.teamOneOvers,
              },
              teamTwoInningStat: {
                runsScored: match.teamTwoRuns,
                wickets: match.teamTwoWickets,
                oversPlayed: match.teamTwoOvers,
              },
              matchWinner: match.matchWinner,
            };

            finished.push(completedMatch);
          }
          else {
            let liveMatch = {
              matchId: match.matchId,
              teamOne: match.teamOne,
              teamTwo: match.teamTwo,
              tossWinner: match.tossWinner,
              tossDecision: match.tossDecision,
              teamOneInningStat: {
                runsScored: match.teamOneRuns,
                wickets: match.teamOneWickets,
                oversPlayed: match.teamOneOvers,
              },
              teamTwoInningStat: {
                runsScored: match.teamTwoRuns,
                wickets: match.teamTwoWickets,
                oversPlayed: match.teamTwoOvers,
              }
            };
            live.push(liveMatch);
          }
        });

        return {live,finished};
}