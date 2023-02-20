import React, { useEffect, useState } from "react";
import "../assets/styles/match.css";
import PlayersInput from "./PlayersInput";
import { GiTennisBall, GiCricketBat } from "react-icons/gi"
import { BiCoin } from "react-icons/bi"
import { AiFillSetting } from "react-icons/ai"
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'

const MatchSettings = () => {
  const [firstTeamTitle, changeFirstTeamTitle] = useState<string>("");
  const [secondTeamTitle, changeSecondTeamTitle] = useState<string>("");
  const [newTeam, setNewTeam] = useState<string>("");
  const [tossWinner, setTossWinner] = useState("");
  const [optedOption, setOptedOption] = useState("");

  const [displaySelectionPanel, changeDisplaySelectionPanel] = useState<boolean>(false);
  const [proceedButtonDisable, changeProceedDisable] = useState<boolean>(true);
  const [startButtonDisable, changeStartDisable] = useState<boolean>(true);
  const [addTeamPannel, hideAddTeamPannel] = useState<boolean>(true);
  const [addButtonDisabled, changeDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false)

  const [teamList] = useState<string[]>([
    "Chennai super kings",
    "Mumbai Indians",
    "Royal Challengers",
    "rajisthan Royals",
    "Sunrisers hyderbad",
    "Gujrat titans",
    "lucknow kings",
    "delhi capitals"
  ]);
  const [TeamOnePlayers, changeTeamOnePlayers] = useState<string[]>([
    "jack",
    "hill",
    "cook",
    "david",
    "henery",
    "jimmy",
    "mark",
    "ben",
    "joe",
    "peter",
    "andrew",
    "aston",
  ]);
  const [TeamTwoPlayers, changeTeamTwoPlayers] = useState<string[]>([
    "shyam",
    "gill",
    "ramesh",
    "anuj",
    "bharath",
    "suresh",
    "venkat",
    "kunal",
    "pretham",
    "sai",
    "karthik",
    "shashi",
  ]);
  const [selectedTeamOne, handleSelectedTeamOne] = useState<string[]>([]);
  const [selectedTeamTwo, handleSelectedTeamTwo] = useState<string[]>([]);

  useEffect(() => {
    if (
      !selectedTeamOne.includes("") &&
      !selectedTeamTwo.includes("") &&
      selectedTeamOne.length !== 0 &&
      selectedTeamTwo.length !== 0
    )
      changeStartDisable(false);
  }, [selectedTeamOne, selectedTeamTwo]);

  useEffect(() => { if (newTeam === '') { changeDisabled(true) } else changeDisabled(false) }, [newTeam])

  const handleProceed = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeDisplaySelectionPanel(true);
  };

  const handleStartMatch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    //once all players are selected of both teams ,to be directed to match center from here
  };

  const handleBackButton = () => {
    changeStartDisable(true);
    changeDisplaySelectionPanel(false);
    changeProceedDisable(true)
  };
  const teamTwoPlaying11 = (list: string[]) => {
    handleSelectedTeamOne(list);
  };
  const teamOnePlaying11 = (list: string[]) => {
    handleSelectedTeamTwo(list);
  };
  const handleAddButton = (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (newTeam === 'asd') {
      setErrorMessage(true)
      e.preventDefault()
    }
    else {

    }
  };

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
                <select
                  className="form-select text-capitalize fs-3"
                  value={firstTeamTitle}
                  onChange={(e) => {
                    changeFirstTeamTitle(e.target.value);
                    setTossWinner("")
                    changeProceedDisable(true)
                    // invoke changeTeamOneplayers from here
                  }}
                >
                  <option value="" disabled>
                    Select Team 1
                  </option>
                  {teamList.map((team) => {
                    if (team !== secondTeamTitle) {
                      return (<option value={team} key={team}>
                        {team}
                      </option>)
                    }
                  })}
                </select>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center fs-1 fw-bolder text-light">
                VS
              </div>
              <div className="col-5 bg-light border border-dark rounded p-4">
                <h3>Team 2</h3>
                <select
                  className="form-select text-capitalize fs-3 "
                  value={secondTeamTitle}
                  onChange={(e) => {
                    changeSecondTeamTitle(e.target.value);
                    setTossWinner("")
                    changeProceedDisable(true)
                    // invoke changeTeamOneplayers from here
                  }}
                >
                  <option value="" disabled>
                    Select Team 2
                  </option>
                  {teamList.map((team) => {
                    if (team !== firstTeamTitle) {
                      return (<option value={team} key={team}>
                        {team}
                      </option>)
                    }
                  })}
                </select>
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
                      value='Batting'
                      id="teamOneTitle"
                      onChange={(e => { setOptedOption(e.target.value); changeProceedDisable(false) })}
                      name="optedOption"
                    />
                    <h4 className="ms-1"><GiCricketBat className="text-warning fs-1"></GiCricketBat></h4>
                  </div>
                  <div className=" d-inline-flex">
                    <input
                      type="radio"
                      value='Bowling'
                      id="teamTwoTitle"
                      onChange={(e => { setOptedOption(e.target.value); changeProceedDisable(false) })}
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
          <form onSubmit={handleStartMatch}>
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
                  playing11={teamOnePlaying11}
                  teamPlayers={TeamOnePlayers}
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
                  playing11={teamTwoPlaying11}
                  teamPlayers={TeamTwoPlayers}
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
        </div>
      )}
    </>


  );
};

export default MatchSettings;
