import React, { useReducer, useState } from "react";
import MatchStatus from "./MatchStatus";
import "../assets/styles/match.css";
import { finishedMatchStats, ongoingMatchStats } from "../models/MatchStatistics";
import { Card } from "react-bootstrap";
import { CiStreamOn } from 'react-icons/ci'
import getMatchesAPI from "../action/MatchInfo/getMatches";
import { useNavigate } from "react-router-dom";
import MatchReducer, { initialState } from "../contexts/MatchReducer";
import { useSelector, useDispatch } from "react-redux";
const MatchView = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  // const [state, dispatch] = useReducer(MatchReducer, initialState);
  const setMatchId = (matchId: any) => {
    dispatch({ type: 'SET_MATCH_ID', payload: { matchId } })
  }

  const [liveMatches, setLiveMatches] = useState<ongoingMatchStats[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<finishedMatchStats[]>([]);

  const liveMatchState = useSelector((state: any) => state)
  //console.log("liveMatchState", liveMatchState);

  const handleClick = (e: any) => {
    let matchId = e.target.getAttribute('data-bs-matchId');
    setMatchId(matchId);
    navigate('/app', { state: { matchId: matchId } })
  };

  React.useEffect(() => {
    setLiveMatches(liveMatchState.liveMatchDetails.live);
    setFinishedMatches(liveMatchState.liveMatchDetails.finished);
    console.log("liveMatches", liveMatches)
    console.log("finishedMatches", finishedMatches)
  }, [liveMatchState]);


  React.useEffect(() => {
    const getData = async () => {
      console.log("bb");
      await dispatch(getMatchesAPI());

    }
    getData();
  }, [])

  return (
    <div className="container mt-4 ">
      <div className="row bg-light m-4 rounded p-2 border border-dark">
        <p className="fs-3 fw-bold  mb-0">LIVE <CiStreamOn className="fs-3 text-danger"></CiStreamOn></p>
        <div className="row  pb-3 d-flex">
          {liveMatches.length === 0 && <p className='col-4 fs-3 m-auto font-dark'>No finished live matches.</p>}
          {liveMatches.length !== 0 &&
            liveMatches.map((match, index) => {
              return (
                <div className="col-lg-6" key={index}>
                  <Card className="border " >
                    <Card.Header className="d-flex">
                      <Card.Title className="fw-bold text-nowrap fs-4">
                        {match.teamOne} VS {match.teamTwo}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body className="text-capitalize">
                      <Card.Text className="text-capitalize  fs-5">
                        {match.tossWinner} won the toss and elected to {match.tossDecision} .
                      </Card.Text>
                      <Card.Title className="d-flex ">
                        <p className="text-primary">{match.teamOne}</p> {(match.teamOneInningStat.runsScored === 0) ? <p className="ms-auto">(Yet to Bat)</p> : <p className="ms-auto">{match.teamOneInningStat.runsScored}/{match.teamOneInningStat.wickets} ({match.teamOneInningStat.oversPlayed})</p>}
                      </Card.Title>
                      <Card.Title className="d-flex ">
                        <p className="text-primary">{match.teamTwo}</p> {(match.teamTwoInningStat.runsScored === 0) ? <p className="ms-auto">(Yet to Bat)</p> : <p className="ms-auto">{match.teamTwoInningStat.runsScored}/{match.teamTwoInningStat.wickets} ({match.teamTwoInningStat.oversPlayed})</p>}
                      </Card.Title>
                      <hr></hr>
                      <div className="d-flex ">
                        <button
                          data-bs-matchId={match.matchId}
                          type="button"
                          className="btn btn-primary m-auto fw-bold fs-5"
                          onClick={handleClick}
                        >
                          Wactch Live
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>
      <div className="row bg-light m-4 rounded p-2">
        <p className=" fs-3 fw-bold mb-0">COMPLETED </p>
        <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 pb-3">
          {finishedMatches.map((matchDetails, index) => {
            return (
              <div className="col mb-3">
                <MatchStatus
                  matchId={matchDetails.matchId}
                  teamName={[
                    matchDetails.teamOne,
                    matchDetails.teamTwo,
                  ]}
                  teamOneDetails={[
                    matchDetails.teamOneInningStat.runsScored,
                    matchDetails.teamOneInningStat.wickets,
                    matchDetails.teamOneInningStat.oversPlayed,
                  ]}
                  teamTwoDetails={[
                    matchDetails.teamTwoInningStat.runsScored,
                    matchDetails.teamTwoInningStat.wickets,
                    matchDetails.teamTwoInningStat.oversPlayed,
                  ]}
                  key={index}
                  index={index}
                  matchWinner={matchDetails.matchWinner}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchView;
