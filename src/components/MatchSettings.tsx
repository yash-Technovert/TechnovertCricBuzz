import React, {  useEffect, useState } from "react";
import "../assets/styles/matchSettings.css";
import PlayersInput from "./PlayersInput";

const MatchSettings = () => {
  const [firstTeamTitle, changeFirstTeamTitle] = useState("");
  const [secondTeamTitle, changeSecondTeamTitle] = useState("");
  const [displaySelectionPanel, changeDisplaySelectionPanel] = useState(false);
  const [proceedButtonDisable, changeProceedDisable] = useState(true);
  const [startButtonDisable, changeStartDisable] = useState(true);
  const [teamList] = useState<string[]>([
    "Chennai super kings",
    "Mumbai Indians",
    "Royal Challengers",
    "rajisthan Royals",
    "Sunrisers hyderbad",
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
    if(firstTeamTitle===secondTeamTitle)
    {
      changeProceedDisable(true)
      return
    }
    if (firstTeamTitle !== "" && secondTeamTitle !== "")
      changeProceedDisable(false);
  }, [firstTeamTitle, secondTeamTitle]);

  useEffect(() => {
    if (
      !selectedTeamOne.includes("") &&
      !selectedTeamTwo.includes("") &&
      selectedTeamOne.length != 0 &&
      selectedTeamTwo.length != 0
    )
      changeStartDisable(false);
  }, [selectedTeamOne, selectedTeamTwo]);

  const handleProceed = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeDisplaySelectionPanel(true);
  };

  const handleStartMatch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(selectedTeamOne,selectedTeamTwo);
  };

  const handleBackButton = () => {
    changeDisplaySelectionPanel(false);
  };
  const teamTwoPlaying11 = (list: string[]) => {
    handleSelectedTeamOne(list);
  };
  const teamOnePlaying11 = (list: string[]) => {
    handleSelectedTeamTwo(list);
  };

  return (
    <>
      {!displaySelectionPanel && (
        <div className="container">
          <div className="d-flex align-items-center justify-content-center mx-4 my-1">
            <p className="fs-2 text-capitalize text-white fw-bolder">
              match setup
            </p>
          </div>
          <form onSubmit={handleProceed}>
            <div className="row d-flex justify-content-around">
              <div className="col-5 bg-light border border-dark rounded p-4">
                <h3 className="d-flex align-items-center justify-content-center">
                  Team 1
                </h3>
                <select
                  className="form-select text-capitalize fs-3"
                  value={firstTeamTitle}
                  onChange={(e) => {
                    changeFirstTeamTitle(e.target.value);
                    // invoke changeTeamOneplayers from here
                    console.log('team players changed');
                  }}
                  placeholder="Enerasdas"
                >
                  <option value="" disabled >
                    Select Team 1
                  </option>
                  {teamList.map((team) => (
                    <option value={team} key={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center fs-1 fw-bolder text-light">
                VS
              </div>
              <div className="col-5 bg-light border border-dark rounded p-4">
                <h3 className="d-flex align-items-center justify-content-center">
                  Team 2
                </h3>
                <select
                  className="form-select text-capitalize fs-3"
                  value={secondTeamTitle}
                  onChange={(e) => {
                    changeSecondTeamTitle(e.target.value);
                    // invoke changeTeamOneplayers from here
                    console.log('team players changed');
                  }}
                >
                  <option value="" disabled >
                    Select Team 2
                  </option>
                  {teamList.map((team) => (
                    <option value={team} key={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center m-3">
              <button
                disabled={proceedButtonDisable}
                type="submit"
                className="btn btn-dark proceedButton border border-light fs-4  fw-bold"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      )}
      {displaySelectionPanel && (
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <p className="fs-2 text-capitalize text-white fw-bolder">
              Team Players selection
            </p>
            <button
              type="submit"
              className="btn btn-dark backButton fs-4  fw-bold border border-light border-1"
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>
          <form onSubmit={handleStartMatch}>
            <div className="row d-flex justify-content-around">
              <div
                className="col-4  border border-dark rounded ps-4 pe-4 pt-1 pb-1"
                style={{ backgroundColor: "white" }}
              >
                <h3 className="d-flex align-items-center justify-content-center text-capitalize">
                  {firstTeamTitle}
                </h3>
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
                <h3 className="d-flex align-items-center justify-content-center text-capitalize">
                  {secondTeamTitle}
                </h3>
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
                className="btn btn-dark border border-light border-1 fs-4  fw-bold startMatch "
                disabled={startButtonDisable}
              >
                Start Match
              </button>
            </div>
          </form>
          <p className="text-light fs-4">
            Note: Select all the players of both teams to enable Start Match .
          </p>
        </div>
      )}
    </>
  );
};

export default MatchSettings;
