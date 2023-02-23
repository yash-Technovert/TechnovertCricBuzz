import React, { useEffect, useState, useReducer } from "react";
import "../assets/styles/match.css";
import PlayersInput from "./PlayersInput";
//icons
import { GiTennisBall, GiCricketBat } from "react-icons/gi"
import { BiCoin } from "react-icons/bi"
import { AiFillSetting } from "react-icons/ai"
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

//apis
import { createMatch, createTeam, getTeams } from "../api/match";

import { Team } from "../models/Team";
import MatchReducer, { initialState } from "../contexts/MatchReducer";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";

//action
import TeamDetails from "../action/TeamDetails";
import createMatchAPI from "../action/MatchInfo/createMatch";

import matchConstants from "../constants/matchConstants";
const MatchSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  // const [state, dispatch] = useReducer(MatchReducer, initialState)
  const setMatch = async(matchInfo: any) => {
    await dispatch({
      type: 'SET_MATCH',
      payload: {
        matchInfo: matchInfo
      }
    })
  }
  const setFirstInning = async(firstInning: any) => {
    await dispatch({
      type: 'SET_FIRSTINNING',
      payload: {
        firstInning: firstInning
      }
    })
  }

  const setTeamOne = async(teamOne: any) => {
    await dispatch({
      type: 'SET_TEAMONE',
      payload: {
        teamOne: teamOne
      }
    })
  }

  const setTeamTwo = async(teamTwo: any) => {
    await dispatch({
      type: 'SET_TEAMTWO',
      payload: {
        teamTwo: teamTwo
      }
    })
  }

  const [firstTeamTitle, changeFirstTeamTitle] = useState<any>('');
  const [secondTeamTitle, changeSecondTeamTitle] = useState<any>('');
  const [teamOneId, setTeamOneId] = useState<any>("");
  const [teamTwoId, setTeamTwoId] = useState<any>("");
  const [newTeam, setNewTeam] = useState<string>("");
  const [tossWinner, setTossWinner] = useState("");
  const [optedOption, setOptedOption] = useState("");

  const [displaySelectionPanel, changeDisplaySelectionPanel] = useState<boolean>(false);
  const [proceedButtonDisable, changeProceedDisable] = useState<boolean>(true);
  const [startButtonDisable, changeStartDisable] = useState<boolean>(true);
  const [addTeamPannel, hideAddTeamPannel] = useState<boolean>(true);
  const [addButtonDisabled, changeDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false)

  const [teamList, setTeamList] = useState<Team[]>([]);
  const [teamOnePlaying11, setTeamOnePlaying11] = useState<any>([]);
  const [teamTwoPlaying11, setTeamTwoPlaying11] = useState<any>([]);
  const [matchDetails, setMatchDetails] = useState<any>({})

  useEffect(() => {
    if (teamOnePlaying11.length === 11 && firstTeamTitle && teamTwoPlaying11.length === 11 && secondTeamTitle) {
      changeStartDisable(false)
    }
  }, [teamOnePlaying11, teamTwoPlaying11, firstTeamTitle, secondTeamTitle]);

  //to get and set up teams
  useEffect(()=>{
    const getData = async() =>{
      await dispatch(TeamDetails()).then((res:any)=>{
        setTeamList(res.data);
      });
    }
    getData()
  },[])

  const setTeamOnePlayers = (players: any) => {
    let arr: any[] = [...players]
    setTeamOnePlaying11(arr)

  }
  const setTeamTwoPlayers = (players: any) => {
    let arr: any[] = [...players]
    setTeamTwoPlaying11(arr)
  }

  useEffect(() => { if (newTeam === '') { changeDisabled(true) } else changeDisabled(false) }, [newTeam])

  const handleProceed = (e: any) => {
    e.preventDefault();
    if (firstTeamTitle !== '' && secondTeamTitle !== '') {
      changeDisplaySelectionPanel(true);
    }
  };
  
  const startMatch = async(e: any) => {
    e.preventDefault();
    console.log("Bbbb ",matchDetails)
    await dispatch(createMatchAPI(matchDetails))
    console.log("matchDetails.teamOnePlaying11",matchDetails.teamOnePlaying11)
    console.log("matchDetails.teamTwoPlaying11",matchDetails.teamTwoPlaying11)

    await dispatch({
      type: matchConstants.SET_TEAMONE,
      payload: matchDetails,
    })

    await dispatch({
      type: matchConstants.SET_TEAMTWO,
      payload: matchDetails,
    })
    navigate('/app');
  };

  const handleBackButton = () => {
    changeStartDisable(true);
    changeDisplaySelectionPanel(false);
    changeProceedDisable(true)
  };
  const handleAddButton = (e: any) => {
    e.preventDefault();
    createTeam(newTeam)
      .then((res: any) => {

      })
    getTeams()
      .then((res: any) => {
        setTeamList(res.data);
      })
    hideAddTeamPannel(true);

    changeDisplaySelectionPanel(false);
    setNewTeam('');
  };


  useEffect(() => {
    if (teamOnePlaying11.length === 11 && teamTwoPlaying11.length === 11) {
      setMatchDetails({ ...matchDetails, teamOnePlayers: teamOnePlaying11, teamTwoPlayers: teamTwoPlaying11, teamOne: firstTeamTitle, teamTwo: secondTeamTitle, tossWinner: tossWinner, tossDecision: optedOption })
    }
  }, [teamOnePlaying11, teamTwoPlaying11, firstTeamTitle, secondTeamTitle, tossWinner, optedOption, matchDetails])

  // useEffect(() => {
  //   getTeams()
  //     .then((res: any) => {
  //       setTeamList(res.data);
  //     })
  // }, []);

  return (
    <>
      {!addTeamPannel && (
        <div className="container mt-5 ">
          <div className="row justify-content-center mt-3 p-4">
            <div className="col-10 d-flex align-items-center justify-content-end p-0">
              <button
                className="btn btn-secondary  border border-light fs-3  fw-bold ps-3 "
                onClick={() => { hideAddTeamPannel(true); setNewTeam(''); setErrorMessage(false); changeProceedDisable(true) }}
              >
                Back<BsArrowRightCircleFill className="p-1 fs-2 ms-2 pt-0"></BsArrowRightCircleFill>
              </button>
            </div>
            <div className="col-10 bg-light border border-dark rounded mt-3">
              <form onSubmit={handleAddButton}>
                <div className="mb-3 p-4">
                  <h3>Team Name</h3>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Team Name Here!!"
                    value={newTeam}
                    onChange={(e) => { setNewTeam(e.target.value) }}
                  />
                  {errorMessage && <p className="text-danger ms-1">Team name entered cannot be added!!</p>}
                </div>
                <div className="d-flex align-items-center justify-content-center pb-3">
                  <button
                    type="submit"
                    className="btn btn-success fs-3 fw-bolder"
                    disabled={addButtonDisabled}
                  >
                    Add Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {!displaySelectionPanel && addTeamPannel && (
        <div className="container mt-5">
          <div className="d-flex align-items-center justify-content-end">
            <button
              className="btn btn-primary  border border-light fs-3  fw-bold"
              onClick={() => { hideAddTeamPannel(false) }}
            >
              Team <FaPlus className="fs-5"></FaPlus>
            </button>
          </div>
          <div className=" mt-4">
            <h1 className=" text-capitalize text-white fw-bolder">
              match setup<AiFillSetting className="ps-1 ms-1 "></AiFillSetting>
            </h1>
          </div>
          <form onSubmit={handleProceed}>
            <div className="row d-flex justify-content-around mt-3 mb-3 p-3">
              <div className="col-5 bg-light border border-dark rounded p-4">
                <h3>Team 1</h3>
                <Form.Select aria-label="Default select example" className='fw-bold fs-5' onChange={
                  (e) => {
                    setTeamOneId(e.target.children[e.target.selectedIndex].getAttribute('data-id'))
                    changeFirstTeamTitle(e.target.value);
                    setTossWinner("")
                    changeProceedDisable(true)
                  }
                }
                  value={firstTeamTitle}
                >
                  <option value='' disabled>Select Team</option>
                  {teamList.map((team) => {
                    if (team.teamName !== secondTeamTitle) {
                      return (<option value={team.teamName} key={team.id} data-id={team.id} >
                        {team.teamName}
                      </option>)
                    }
                    return null;
                  })}
                </Form.Select>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center fs-1 fw-bolder text-light">
                VS
              </div>
              <div className="col-5 bg-light border border-dark rounded p-4">
                <h3>Team 2</h3>
                <Form.Select aria-label="Default select example" className="fw-bold fs-5" onChange={
                  (e) => {
                    setTeamTwoId(e.target.children[e.target.selectedIndex].getAttribute('data-id'))
                    changeSecondTeamTitle(e.target.value)
                    setTossWinner("")
                    changeProceedDisable(true)
                  }
                }
                  value={secondTeamTitle}
                >
                  <option value='' disabled>Select Team</option>
                  {teamList.map((team) => {
                    if (team.teamName !== firstTeamTitle) {
                      return (<option value={team.teamName} key={team.id} data-id={team.id}>
                        {team.teamName}
                      </option>)
                    }
                    return null;
                  })}
                </Form.Select>
              </div>
            </div>
            <div className="bg-light rounded">
              {tossWinner.length === 0 && <div className="d-inline-flex text-capitalize p-4">
                <h4 className=" pe-2 fw-bold ps-2">Toss <BiCoin className=" me-2 text-warning"></BiCoin> </h4>
                <div className=" d-inline-flex ms-3 me-5">
                  <input
                    type="radio"
                    value={firstTeamTitle}
                    id="teamOneTitle"
                    onChange={(e) => { setTossWinner(e.target.value) }}
                    name="tossWinner"
                  />
                  <h4 className="ms-1">{(firstTeamTitle.length === 0) ? 'Team 1' : firstTeamTitle}</h4>
                </div>
                <div className=" d-inline-flex">
                  <input
                    type="radio"
                    value={secondTeamTitle}
                    id="teamTwoTitle"
                    onChange={(e) => { setTossWinner(e.target.value) }}
                    name="tossWinner"
                  />
                  <h4 className="ms-1">{(secondTeamTitle.length === 0) ? 'Team 2' : secondTeamTitle}</h4>
                </div>
              </div>}
              {tossWinner.length !== 0 && <div className="p-4 text-capitalize pb-3">
                <div className="d-inline-flex text-capitalize ">
                  <p className=" pe-2 fs-4 fw-bold mt-1 mb-0 ms-2">{tossWinner} Opted to</p>
                  <div className=" d-inline-flex ms-3 me-5">
                    <input
                      type="radio"
                      value='bat'
                      id="teamOneTitle"
                      onChange={(e => { setOptedOption(e.target.value); if (firstTeamTitle.length !== 0 || secondTeamTitle.length !== 0) changeProceedDisable(false) })}
                      name="optedOption"
                    />
                    <h4 className="ms-1"><GiCricketBat className="text-warning fs-1"></GiCricketBat></h4>
                  </div>
                  <div className=" d-inline-flex">
                    <input
                      type="radio"
                      value='bowl'
                      id="teamTwoTitle"
                      onChange={(e => { setOptedOption(e.target.value); if (firstTeamTitle.length !== 0 || secondTeamTitle.length !== 0) changeProceedDisable(false) })}
                      name="optedOption"
                    />
                    <h4 className="ms-1"><GiTennisBall className="text-success fs-1"></GiTennisBall></h4>
                  </div>
                </div>
                <div className="float-end ">
                  <button type="button" className="btn btn-danger fw-bold border border-light fs-5 " onClick={() => { setTossWinner(''); setOptedOption(''); changeProceedDisable(true) }}>Change Toss Winner</button>
                </div>
              </div>}
            </div>
            <div className="d-flex align-items-center justify-content-center m-4">
              <button
                disabled={proceedButtonDisable}
                type="submit"
                className="btn btn-dark proceedButton border border-light fs-2  fw-bold"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      )}
      {displaySelectionPanel && (
        <div className="container">
          <div className="row d-flex justify-content-around mt-2 mb-2">
            <p className="fs-3 text-capitalize text-white fw-bolder col-6 me-5 p-0">
              Team Players selection
            </p>
            <button
              type="submit"
              className="btn btn-dark fs-5 fw-bold border border-light border-2 col-1 ms-5 mt-2 "
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>
          <form onSubmit={startMatch}>
            <div className="row justify-content-around ">
              <div
                className="col-4  border border-dark rounded ps-4 pe-4 pt-1 pb-1"
                style={{ backgroundColor: "white" }}
              >
                <h4 className="d-flex fw-bold align-items-center justify-content-center text-capitalize m-1">
                  {(firstTeamTitle === tossWinner) ? <p className="bg-warning fs-4 mt-0 mb-0 me-3 ps-2 pe-2 rounded-circle text-light">T</p> : <></>}{firstTeamTitle}{(firstTeamTitle === tossWinner) ? (optedOption === 'Batting') ? <GiCricketBat className="text-warning fs-2 ms-2"></GiCricketBat> : <GiTennisBall className="text-success fs-2 ms-2"></GiTennisBall> : <></>}
                </h4>
                <hr className="mt-0"></hr>
                <PlayersInput
                  teamId={teamOneId}
                  setTeamPlayers={setTeamOnePlayers}
                />
              </div>
              <div
                className="col-4  border border-dark rounded ps-4 pe-4 pt-1 pb-1"
                style={{ backgroundColor: "white" }}
              >
                <h4 className="d-flex fw-bold align-items-center justify-content-center text-capitalize  m-1">
                  {(secondTeamTitle === tossWinner) ? <p className="bg-warning fs-4 mt-0 mb-0 me-3 ps-2 pe-2 rounded-circle text-light">T</p> : <></>}{secondTeamTitle}{(secondTeamTitle === tossWinner) ? (optedOption === 'Batting') ? <GiCricketBat className="text-warning fs-2 ms-2"></GiCricketBat> : <GiTennisBall className="text-success fs-2 ms-2"></GiTennisBall> : <></>}
                </h4>
                <hr className="mt-0"></hr>
                <PlayersInput
                  teamId={teamTwoId}
                  setTeamPlayers={setTeamTwoPlayers}
                />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center m-3">
              <button
                type="submit"
                className="btn btn-dark border border-light border-2 fs-4  fw-bold startMatch "
                disabled={startButtonDisable}
              >
                Start Match
              </button>
            </div>
          </form>
          <p>{matchDetails.firstTeamTitle}</p>
        </div>
      )}
    </>


  );
};

export default MatchSettings;
