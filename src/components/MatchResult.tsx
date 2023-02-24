import React, { useState } from 'react'
import { BsArrowRightCircleFill } from 'react-icons/bs'
import { MatchDetails, PlayerStats } from "../models/SummaryDetails"
type propType = {
    id: string,
    handleBackButton: () => void
}


const MatchResult = ({ id, handleBackButton }: propType) => {
    const [matchDetails, setMatchDetials] = useState<MatchDetails>({
        matchId: '123',
        teamOne: "Team daaru",
        teamTwo: "Team technovert kings",
        matchWinner: 'abc',
        teamOnePlayerStats: [{
            matchId: "123",
            inningsId: "###",
            runs: 0,
            balls: 6,
            four: 1,
            six: 1,
            wickets: 1,
            maiden: 0,
            runsConceded: 12,
            over: 1,
            name: "mas"
        },
        {
            matchId: "123",
            inningsId: "###",
            runs: 12,
            balls: 12,
            four: 1,
            six: 1,
            wickets: 0,
            maiden: 0,
            runsConceded: 0,
            over: 0,
            name: "kunal"
        },
        {
            matchId: "123",
            inningsId: "###",
            runs: 0,
            balls: 0,
            four: 4,
            six: 0,
            wickets: 2,
            maiden: 1,
            runsConceded: 30,
            over: 2,
            name: "ramesh"
        },
        {
            matchId: "123",
            inningsId: "###",
            runs: 40,
            balls: 25,
            four: 2,
            six: 5,
            wickets: 0,
            maiden: 0,
            runsConceded: 0,
            over: 0,
            name: "sachin"
        }],
        teamTwoPlayerStats: [{
            matchId: "123",
            inningsId: "###",
            runs: 32,
            balls: 20,
            four: 2,
            six: 4,
            wickets: 0,
            maiden: 0,
            runsConceded: 0,
            over: 0,
            name: "gill"
        },
        {
            matchId: "123",
            inningsId: "###",
            runs: 22,
            balls: 19,
            four: 4,
            six: 0,
            wickets: 2,
            maiden: 1,
            runsConceded: 30,
            over: 2,
            name: "ben"
        },
        {
            matchId: "123",
            inningsId: "###",
            runs: 0,
            balls: 0,
            four: 0,
            six: 0,
            wickets: 4,
            maiden: 1,
            runsConceded: 10,
            over: 3,
            name: "mark"
        }],
        teamOneStats:
        {
            teamName: "abc",
            runsScored: 123,
            wickets: 4,
            oversPlayed: 8,
            isFirstInnings: false,
            wide: 6,
            noBall: 4
        },
        teamTwoStats:
        {
            teamName: "xyz",
            runsScored: 130,
            wickets: 5,
            oversPlayed: 9,
            isFirstInnings: true,
            wide: 3,
            noBall: 2
        }
    })

    const displayBattingRows = (teamPlayerStats: PlayerStats[]) => {
        return (
            teamPlayerStats.filter(x => x.balls !== 0).map((x, index) => {
                return (<tr>
                    <th scope="row">{x.name}</th>
                    <td>{x.runs}</td>
                    <td>{x.balls}</td>
                    <td>{x.four}</td>
                    <td>{x.six}</td>
                    <td>{strikeCalculator(x)}</td>
                </tr>)
            })
        )
    }
    const displayBowlingRows = (teamPlayerStats: PlayerStats[]) => {
        return (
            teamPlayerStats.filter(x => x.over !== 0).map((x, index) => {
                return (<tr>
                    <th scope="row">{x.name}</th>
                    <td>{x.over}</td>
                    <td>{x.maiden}</td>
                    <td>{x.runsConceded}</td>
                    <td>{x.wickets}</td>
                    <td>{economyCalculator(x)}</td>
                </tr>)
            })
        )
    }
    const strikeCalculator = (x: PlayerStats) => { return ((x.runs / x.balls) * 100).toFixed(2) }
    const economyCalculator = (x: PlayerStats) => { return ((x.runsConceded / x.over)).toFixed(2) }
    return (
        <div className="container mt-5 ">
            <div className="row justify-content-center mt-3 p-4">
                <div className="col-12 d-flex align-items-center justify-content-end p-0">
                    <button
                        className="btn btn-secondary  border border-light fs-3  fw-bold ps-3 "
                        onClick={() => { handleBackButton() }}
                    >
                        Back<BsArrowRightCircleFill className="p-1 fs-2 ms-2 pt-0"></BsArrowRightCircleFill>
                    </button>
                </div>
                <div className="col-12 bg-light border border-dark rounded mt-3 p-0 ">
                    <div className='d-flex'>
                        <p className='m-auto m-2 fs-2 fw-bold '>Technovert Premier League</p>
                    </div>
                    <hr className="m-0 ms-2 me-2"></hr>
                    <div>
                        <p className='fw-bold text-capitalize ms-3 mt-1 fs-4'>{matchDetails.teamOne} VS {matchDetails.teamTwo} </p>
                    </div>
                    <p className='text-capitalize fs-5 ms-3'>Team {matchDetails.matchWinner} won the match !!</p>
                </div>
                <div className="col-12 bg-light border border-dark  rounded mt-3 p-1">
                    <div className='bg-secondary text-light fs-2 fw-bold ps-2 d-flex'><p className='m-auto'>1st Innings</p></div>
                    <div className='row'>
                        <div className='col-md-6 text-capitalize'>
                            {(matchDetails.teamOneStats?.isFirstInnings) ? <div className='fs-4 d-flex ms-2 text-capitalize'><p className='fw-bold'>{matchDetails.teamOne}</p><p className='ms-auto me-2'>{matchDetails.teamOneStats.runsScored}-{matchDetails.teamOneStats.wickets} ({matchDetails.teamOneStats.oversPlayed} Overs)</p></div>:<div className='d-flex fs-4 ms-2 text-capitalize'><p className='fw-bold'>{matchDetails.teamTwo}</p><p className='ms-auto me-2'>{matchDetails.teamTwoStats.runsScored}-{matchDetails.teamTwoStats.wickets} ({matchDetails.teamTwoStats.oversPlayed} Overs)</p></div>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Batter </th>
                                        <th scope="col">Runs</th>
                                        <th scope="col">Balls</th>
                                        <th scope="col">4</th>
                                        <th scope="col">6</th>
                                        <th scope="col">SR</th>
                                    </tr>
                                </thead>
                                {(matchDetails.teamOneStats.isFirstInnings) ? <tbody>{displayBattingRows(matchDetails.teamOnePlayerStats)}</tbody> : <tbody>{displayBattingRows(matchDetails.teamTwoPlayerStats)}</tbody>}
                            </table>
                        </div>
                        <div className='col-md-6'>
                        {!(matchDetails.teamOneStats?.isFirstInnings) ? <p className='fs-4 fw-bold ms-2 text-capitalize'>{matchDetails.teamOne}</p> : <p className='fs-4 fw-bold ms-2 text-capitalize'>{matchDetails.teamTwo}</p>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Bowler</th>
                                        <th scope="col">Ovs</th>
                                        <th scope="col">Maidens</th>
                                        <th scope="col">Runs</th>
                                        <th scope="col">W</th>
                                        <th scope="col">Avg</th>
                                    </tr>
                                </thead>
                                {(matchDetails.teamOneStats?.isFirstInnings) ?<tbody >{displayBowlingRows(matchDetails.teamTwoPlayerStats)}</tbody>: <tbody >{displayBowlingRows(matchDetails.teamOnePlayerStats)}</tbody>}
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-12 bg-light border border-dark rounded mt-3 p-1">
                    <div className='bg-secondary text-light fs-2 fw-bold ps-2 d-flex'><p className='m-auto'>2nd Innings</p></div>
                    <div className='row'>
                        <div className='col-md-6 text-capitalize'>
                            {!(matchDetails.teamOneStats?.isFirstInnings) ?  <div className='d-flex fs-4 ms-2 text-capitalize'><p className='fw-bold'>{matchDetails.teamOne}</p><p className='ms-auto me-2'>{matchDetails.teamOneStats.runsScored}-{matchDetails.teamOneStats.wickets} ({matchDetails.teamOneStats.oversPlayed} Overs)</p></div> : <div className='d-flex fs-4 ms-2 text-capitalize'><p className='fw-bold'>{matchDetails.teamTwo}</p><p className='ms-auto me-2'>{matchDetails.teamTwoStats.runsScored}-{matchDetails.teamTwoStats.wickets} ({matchDetails.teamTwoStats.oversPlayed} Overs)</p></div>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Batter </th>
                                        <th scope="col">Runs</th>
                                        <th scope="col">Balls</th>
                                        <th scope="col">4</th>
                                        <th scope="col">6</th>
                                        <th scope="col">SR</th>
                                    </tr>
                                </thead>
                                {!(matchDetails.teamOneStats.isFirstInnings) ? <tbody>{displayBattingRows(matchDetails.teamOnePlayerStats)}</tbody> : <tbody>{displayBattingRows(matchDetails.teamTwoPlayerStats)}</tbody>}
                            </table>
                        </div>
                        <div className='col-md-6'>
                        {(matchDetails.teamOneStats?.isFirstInnings) ? <p className='fs-4 fw-bold ms-2 text-capitalize'>{matchDetails.teamOne}</p> : <p className='fs-4 fw-bold ms-2 text-capitalize'>{matchDetails.teamTwo}</p>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Bowler</th>
                                        <th scope="col">Ovs</th>
                                        <th scope="col">Madien</th>
                                        <th scope="col">Runs</th>
                                        <th scope="col">W</th>
                                        <th scope="col">Avg</th>
                                    </tr>
                                </thead>
                                {!(matchDetails.teamOneStats?.isFirstInnings) ?<tbody >{displayBowlingRows(matchDetails.teamTwoPlayerStats)}</tbody>: <tbody >{displayBowlingRows(matchDetails.teamOnePlayerStats)}</tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchResult