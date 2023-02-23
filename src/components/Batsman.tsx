import * as React from 'react';
import { useState } from 'react';
import {Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'
import { useDispatch, useSelector } from "react-redux";
import getCurrentPlayerScore from '../action/MatchInfo/getCurrentPlayerScore';

const Batsman = (props:any) => {
    const [playerOneStats,setPlayerOneStats]=useState<any>(undefined)
    const [playerTwoStats,setPlayerTwoStats]=useState<any>(undefined)
    const matchId= useSelector((state:any)=>state.matchInfo?.matchInfo?.id)
    const dispatch = useDispatch<any>();

    React.useEffect(()=>{
        const checkPlayerOneStats = async()=>{
            if(props.batsManOne){
                // console.log("if one",props.batsManOne)
                // props.teamOnePlayers.forEach((obj:any)=>{
                //     if(obj.id===props.batsManOne){
                //         setPlayerOneStats(obj)
                //     }
                // })
                dispatch(getCurrentPlayerScore(props.batsManOne,matchId))
            }
        }

        const checkPlayerTwoStats = async()=>{
            
            if(props.batsManTwo){
                console.log("if two",props.batsManTwo)
                props.teamOnePlayers.forEach((obj:any)=>{
                    if(obj.id===props.batsManOne){
                        setPlayerTwoStats(obj)
                    }
                })
            }
        }

        checkPlayerOneStats();
        checkPlayerTwoStats();
    },[props.batsManTwo,props.batsManOne])

    return (
        <>
        <div className='row'>
            <div className='col-md-8'>
                <div className="row">
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <label>Batting:  </label>
                            </div>
                            <div className='col-md-5'>
                                <span><b>{props.teamOne}</b></span>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <label>Bowler:  </label>
                            </div>
                            <div className='col-md-5'>
                                <span><b>{props.teamTwo}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='row'>
                    <div className='col-md-6'>
                        <label>Select Batting Team  </label>
                    </div>
                    <div className='col-md-6'>
                        <button onClick={props.changeTeamHandler} className='btn btn-success w-100'>Change</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="batsman my-3">
            <Table striped bordered hover variant="dark">
                <thead className='p-5'>
                    <tr>
                        <th>Batter</th>
                        <th>R</th>
                        <th>B</th>
                        <th>4</th>
                        <th>6</th>
                        <th>SR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='ps-3 pe-5 py-3 col-6'>
                            {props.isAdmin ? 
                                <Form.Select aria-label="Default select example" onChange={(e:any) => props.setBatsManOne(e.target.value)}>
                                    <option>--select--</option>
                                    {
                                        props.teamOnePlayers?
                                        props.teamOnePlayers.map((batsman1:any)=>{
                                            return <option value={batsman1.id}>{batsman1.name}</option>
                                        }):props.teamOnePlaying11.map((batsman1:any)=>{
                                            return <option value={batsman1.id}>{batsman1.name}</option>
                                        })
                                    }
                                </Form.Select>
                                :
                                <p className='mt-2 mb-0'>Batsman</p>
                            }
                        </td>
                        {/* {  props.batsManOne && (<>
                                {
                                    props.teamOnePlayers.forEach((obj:any)=>{
                                        if(obj.id===props.batsManOne){
                                            <>
                                                {console.log("Bidyut foreach",obj.ballsPlayed)}
                                                <td><p className='mt-3'>{obj.runs}</p></td>
                                                <td><p className='mt-3'>{obj.ballsPlayed}</p></td>
                                                <td><p className='mt-3'>{obj.four}</p></td>
                                                <td><p className='mt-3'>{obj.six}</p></td>
                                                <td><p className='mt-3'></p></td>
                                            </>
                                            
                                        }
                                    })
                                }
                                
                            </>)
                        } */}
                        {playerOneStats && (<>
                            {/* Player One  */}
                            {/* {
                                let balls = Math.floor(oversPlayed) * 6
                                let rem = (oversPlayed - Math.floor(oversPlayed)) * 10 
                                let ballsPlayed = balls + rem
                                return (runsScored / (ballsPlayed / 6))
                            } */}
                            {console.log("Team One")}
                            <td><p className='mt-3'>{playerOneStats.runs}</p></td>
                            <td><p className='mt-3'>{playerOneStats.ballsPlayed}</p></td>
                            <td><p className='mt-3'>{playerOneStats.four}</p></td>
                            <td><p className='mt-3'>{playerOneStats.six}</p></td>
                            <td><p className='mt-3'></p></td>
                        </>)}
                        
                    </tr>
                    <tr className='py-5'>
                        <td className='ps-3 pe-5 py-3 col-6'>
                            {props.isAdmin ? 
                                <Form.Select aria-label="Default select example" onChange={(e:any) => props.setBatsManTwo(e.target.value)}>
                                    <option>--select--</option>
                                    {
                                        props.teamOnePlayers?
                                        props.teamOnePlayers.map((batsman2:any)=>{
                                            return <option value={batsman2.id}>{batsman2.name}</option>
                                        }):props.teamOnePlaying11.map((batsman2:any)=>{
                                            return <option value={batsman2.id}>{batsman2.name}</option>
                                        })
                                    }
                                </Form.Select>
                                :
                                <p className='mt-2 mb-0'>Batsman</p>
                            }
                        </td>
                        { playerTwoStats && (<>
                            {console.log("Team Two")}

                            <td><p className='mt-3'>{playerTwoStats.runs}</p></td>
                            <td><p className='mt-3'>{playerTwoStats.ballsPlayed}</p></td>
                            <td><p className='mt-3'>{playerTwoStats.four}</p></td>
                            <td><p className='mt-3'>{playerTwoStats.six}</p></td>
                            <td><p className='mt-3'></p></td>
                        </>)}

                    </tr>
                </tbody>
        </Table>
        </div>
        <div className="battings-stats d-flex justify-content-between">
            <p className='fw-bold'>Partnetship: <span>30(25)</span></p>
            <p className='fw-bold'>4s: <span>{props.four}</span>, 6s: <span>{props.six}</span></p>
        </div>
        </>
    );
};

export default Batsman;
