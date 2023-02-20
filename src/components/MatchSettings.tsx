import React, { useEffect, useState } from "react";
import "../assets/styles/match.css";
import PlayersInput from "./PlayersInput";
import { GiTennisBall, GiCricketBat } from "react-icons/gi"
import { BiCoin } from "react-icons/bi"
import { AiFillSetting } from "react-icons/ai"
import { createTeam, getTeams } from "../api/match";
import { Team } from "../models/Team";
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

    const [teamList, setTeamList] = useState<Team[]>([]);
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
        if (firstTeamTitle === secondTeamTitle || optedOption === '') {
            console.log('ehello')
            changeProceedDisable(true);
            return;
        }
        if (firstTeamTitle !== "" && secondTeamTitle !== "" && optedOption !== '')
            changeProceedDisable(false);
    }, [firstTeamTitle, secondTeamTitle, optedOption]);

    const handleProceed = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        changeDisplaySelectionPanel(true);
    };

    const handleStartMatch = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(selectedTeamOne,selectedTeamTwo);
    };

    const handleBackButton = () => {
        changeStartDisable(true);
        changeDisplaySelectionPanel(false);
    };
    const iconDisplay = (teamName: string) => {
        return true
    }
    const teamTwoPlaying11 = (list: string[]) => {
        handleSelectedTeamOne(list);
    };
    const teamOnePlaying11 = (list: string[]) => {
        handleSelectedTeamTwo(list);
    };
    const handleAddTeam = () => {
        hideAddTeamPannel(false);
        setNewTeam("");
        changeDisabled(true);
    };
    const handleAddButton = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTeam(newTeam)
            .then((res) => {
                console.log(res);
            })
        getTeams()
            .then((res) => {
                setTeamList(res.data);
            })
        hideAddTeamPannel(true);

        changeDisplaySelectionPanel(false);
    };
    const handleTeamNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTeam(e.target.value);
        if (e.target.value === "") {
            changeDisabled(true);
            return;
        }
        changeDisabled(false);
    };

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTossWinner(e.target.value);
    };

    useEffect(() => {
        if (
            !selectedTeamOne.includes("") &&
            !selectedTeamTwo.includes("") &&
            selectedTeamOne.length !== 0 &&
            selectedTeamTwo.length !== 0
        )
            changeStartDisable(false);
    }, [selectedTeamOne, selectedTeamTwo]);

    useEffect(() => {
        console.log('hello')
        getTeams()
            .then((res) => {
                console.log(res.data);
                setTeamList(res.data);
            })
    }, []);

    return (
        <>
            {!addTeamPannel && (
                <div className="container mt-4 ">
                    <div className="row justify-content-center mt-3 p-4">
                        <div className="col-7 addTeamPanel border border-dark rounded">
                            <form onSubmit={handleAddButton}>
                                <div className=" p-4">
                                    <h3>Team Name</h3>
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Enter Team Name Here"
                                        value={newTeam}
                                        onChange={handleTeamNameInput}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-center pb-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success fs-5 fw-bolder"
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
                            onClick={handleAddTeam}
                        >
                            Add Team +
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
                                        // invoke changeTeamOneplayers from here
                                        //console.log("team players changed");
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Team 1
                                    </option>
                                    {teamList.map((team) => {
                                        if (team.teamName !== secondTeamTitle) {
                                            return (<option value={team.teamName} key={team.id}>
                                                {team.teamName}
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
                                        // invoke changeTeamOneplayers from here
                                        //console.log("team players changed");
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Team 2
                                    </option>
                                    {teamList.map((team) => {
                                        if (team.teamName !== firstTeamTitle) {
                                            return (<option value={team.teamName} key={team.id}>
                                                {team.teamName}
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
                                        id="male"
                                        onChange={handleChange}
                                        name="tossWinner"
                                    />
                                    <h4 className="ms-1">{(firstTeamTitle.length === 0) ? 'Team 1' : firstTeamTitle}</h4>
                                </div>
                                <div className=" d-inline-flex">
                                    <input
                                        type="radio"
                                        value={secondTeamTitle}
                                        id="female"
                                        onChange={handleChange}
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
                                            id="male"
                                            onChange={(e => setOptedOption(e.target.value))}
                                            name="optedOption"
                                        />
                                        <h4 className="ms-1"><GiCricketBat className="text-warning fs-1"></GiCricketBat></h4>
                                    </div>
                                    <div className=" d-inline-flex">
                                        <input
                                            type="radio"
                                            value='Bowling'
                                            id="female"
                                            onChange={(e => setOptedOption(e.target.value))}
                                            name="optedOption"
                                        />
                                        <h4 className="ms-1"><GiTennisBall className="text-success fs-1"></GiTennisBall></h4>
                                    </div>
                                </div>
                                <div className="float-end ">
                                    <button type="button" className="btn btn-danger fw-bold border border-light fs-5 " onClick={() => { setTossWinner(''); setOptedOption('') }}>Change Toss Winner</button>
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
                    <div className="row justify-content-around mt-2 mb-2">
                        <p className="fs-3 text-capitalize text-white fw-bolder col-6 me-5 p-0">
                            Team Players selection
                        </p>
                        <button
                            type="submit"
                            className="btn btn-dark backButton fs-5 fw-bold border border-light border-2 col-6 ms-5 mt-2 "
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
                                <h3 className="d-flex fw-bold align-items-center justify-content-center text-capitalize mt-1">
                                    {firstTeamTitle}{(iconDisplay(firstTeamTitle)) ? <GiCricketBat className="text-warning fs-2 ms-2"></GiCricketBat> : <GiTennisBall className="text-success fs-2 ms-2"></GiTennisBall>}
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
                                <h3 className="d-flex fw-bold align-items-center justify-content-center text-capitalize mt-1">
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