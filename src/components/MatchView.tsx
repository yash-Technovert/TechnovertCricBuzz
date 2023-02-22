import React, { useState } from "react";
import MatchStatus from "./MatchStatus";
import "../assets/styles/match.css";
import { finishedMatchStats } from "../models/MatchStatistics";
import { Card } from "react-bootstrap";
import {CiStreamOn} from 'react-icons/ci'
const MatchView = () => {
  const [liveMatches, changeLiveMatches] = useState<any[]>([
  {
    teamOne:"Technoverts Daaru",
    teamTwo:"Technoverts super kings",
    tossWinner:"Technoverts Daaru",
    tossDecision:"Bat",
    teamOneRuns:123,
    teamOneWickets:2,
    teamOneCurr:9.7,
    teamOneOverPlayed:8.0,
    teamTwoRuns:101,
    teamTwoWickets:4,
    teamTwoCurr:8.7,
    teamTwoOverPlayed:9.0,
  },
  {
    teamOne:"Technoverts kings",
    teamTwo:"The Technovert Falcons",
    tossWinner:"Technoverts kings",
    tossDecision:"Bowl",
    teamOneRuns:89,
    teamOneWickets:7,
    teamOneCurr:5.7,
    teamOneOverPlayed:9.0,
    teamTwoRuns:0,
    teamTwoWickets:4,
    teamTwoCurr:7.7,
    teamTwoOverPlayed:6.0,
  }
  ]);
  const [finishedMatches, changeFinishedMatches] = useState<
    finishedMatchStats[]
  >([
    {
      id: "1",
      teamOneInningStat: {
        teamName: "abc",
        runsScored: 100,
        wickets: 2,
        oversPlayed: 10,
        isFirstInning: true,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      teamTwoInningStat: {
        teamName: "xyz",
        runsScored: 120,
        wickets: 4,
        oversPlayed: 12,
        isFirstInning: false,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      tossWinner: "abc team",
      matchWinner: "xyz team",
      matchTime: "12:00:00",
    },
    {
      id: "4",
      teamOneInningStat: {
        teamName: "Technovert super kings",
        runsScored: 140,
        wickets: 6,
        oversPlayed: 8,
        isFirstInning: true,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      teamTwoInningStat: {
        teamName: "Technovert legends",
        runsScored: 128,
        wickets: 10,
        oversPlayed: 11,
        isFirstInning: false,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      tossWinner: "Technovert super kings",
      matchWinner: "Technovert legends",
      matchTime: "12:00:00",
    },
    {
      id: "2",
      teamOneInningStat: {
        teamName: "Team daru",
        runsScored: 200,
        wickets: 0,
        oversPlayed: 13,
        isFirstInning: true,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      teamTwoInningStat: {
        teamName: "Team technovert legends",
        runsScored: 140,
        wickets: 4,
        oversPlayed: 14,
        isFirstInning: false,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      tossWinner: "sss team",
      matchWinner: "Team technovert legends",
      matchTime: "12:00:00",
    },
    {
      id: "3",
      teamOneInningStat: {
        teamName: "Team kings",
        runsScored: 200,
        wickets: 0,
        oversPlayed: 13,
        isFirstInning: true,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      teamTwoInningStat: {
        teamName: "Team technovert legends",
        runsScored: 140,
        wickets: 4,
        oversPlayed: 14,
        isFirstInning: false,
        extras: {
          wide: 0,
          noBall: 1,
          bye: 0,
          legBye: 0,
        },
      },
      tossWinner: "Team kings",
      matchWinner: "Team kings",
      matchTime: "12:00:00",
    },
  ]);
  const teamTitle=(title:string)=>{
    var words=title.split(' ')
    var res:string='';
    words.forEach(x=>res+=x.charAt(0).toUpperCase())
    return res;
  }
  return (
    <div className="container mt-4 ">
      <div className="row bg-light m-4 rounded p-2 border border-dark">
        <p className="fs-3 fw-bold " style={{textAlign:'center'}}>LIVE <CiStreamOn className="fs-3 text-danger"></CiStreamOn></p>
        <div className="row  pb-3 d-flex m-auto">
          {liveMatches.length=== 0 && <p className='col-4 fs-3 m-auto font-dark'>No current live matches.</p>}
          {liveMatches.length !== 0 &&
            liveMatches.map((match, index) => {
              return (
                <div className="col-lg-6">
                  <Card className="border border-dark" >
                    <Card.Header >
                        <Card.Title className="fw-bold d-flex " >
                        <p className="m-auto fw-bold">{teamTitle(match.teamOne)} VS  {teamTitle(match.teamTwo)}</p>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body className="text-capitalize">
                      <Card.Text className="text-capitalize " style={{fontSize:'1rem'}}>
                        {match.tossWinner} won the toss and elected to {match.tossDecision} 
                      </Card.Text>
                      <Card.Title className="d-md-flex ">
                        <p className="text-primary text-nowrap fw-bold">{match.teamOne}</p> {(match.teamOneRuns===0)?<p className="ms-auto">(Yet to Bat)</p>:<p className="ms-auto text-nowrap ">{match.teamOneRuns}/{match.teamOneWickets} ({match.teamOneOverPlayed} Overs)</p>} 
                      </Card.Title>
                      <Card.Title className="d-md-flex ">
                        <p className="text-primary text-nowrap fw-bold" style={{}}>{match.teamTwo}</p> {(match.teamTwoRuns===0)?<p className="ms-auto">(Yet to Bat)</p>:<p className="ms-auto text-nowrap">{match.teamTwoRuns}/{match.teamTwoWickets} ({match.teamTwoOverPlayed} Overs)</p>}
                      </Card.Title>
                      <hr></hr>
                      <div className="d-flex ">
                        <button
                          type="button"
                          className="btn btn-primary m-auto fw-bold fs-5"
                        >
                          Match Center
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
        <p className=" fs-3 fw-bold mb-0" style={{textAlign:'center'}}>COMPLETED </p>
        <div className="row row-cols-xl-3 row-cols-md-2 row-cols-sm-1 pb-3 d-flex m-auto">
          {finishedMatches.map((matchDetails, index) => {
            return (
              <div className="col">
                <MatchStatus
                  teamName={[
                    matchDetails.teamOneInningStat.teamName,
                    matchDetails.teamTwoInningStat.teamName,
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
                ></MatchStatus>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchView;
