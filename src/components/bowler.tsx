import * as React from 'react';
import { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'
import { useSelector } from "react-redux";

// @ts-ignore
const Bowler = (props) => {
    const [blowerStats,setBlowerStats]=useState<any>(undefined)

    React.useEffect(()=>{
        const checkBlowerStats = async()=>{
            if(props.currentBolwer){
                console.log("if one",props.currentBolwer)
                props.teamTwoPlayers.forEach((obj:any)=>{
                    if(obj.id===props.currentBolwer){
                        setBlowerStats(obj)
                    }
                })
            }
        }


        checkBlowerStats();
    },[props.currentBolwer])
    return (
        <>
            <div className="bowler">
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr className='p-2'>
                        <th>Bowler</th>
                        <th>O</th>
                        <th>M</th>
                        <th>R</th>
                        <th>W</th>
                        <th>ER</th>
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        <td className='ps-3 pe-5 py-3 col-6'>
                            {props.isAdmin ?
                                <Form.Select aria-label="Default select example" onChange={(e)=> props.setCurrentBolwer(e.target.value)}>
                                    {console.log("bolwer",props.teamTwoPlayers)}
                                    <option>--select--</option>
                                    {
                                        props.teamTwoPlayers?
                                        props.teamTwoPlayers?.map((bolwer:any, index: any)=>{
                                            return <option key={index} value={bolwer.id}>{bolwer.name}</option>
                                        }):props.teamOnePlaying11?.map((bolwer:any, index:any)=>{
                                            return <option key={index} value={bolwer.id}>{bolwer.name}</option>
                                        })
                                    }
                                </Form.Select>
                                :
                                <p className='mt-2 mb-0'>Bowler</p>
                            }
                        </td>
                        {blowerStats && (<>
                            {/* Player One  */}
                            {/* {
                                let balls = Math.floor(oversPlayed) * 6
                                let rem = (oversPlayed - Math.floor(oversPlayed)) * 10 
                                let ballsPlayed = balls + rem
                                return (runsScored / (ballsPlayed / 6))
                            } */}
                            {console.log("Bolwer Stats")}
                            <td><p className='mt-3'>{blowerStats.overs}</p></td>
                            <td><p className='mt-3'>{blowerStats.runsConceded}</p></td>
                            <td><p className='mt-3'>{blowerStats.maiden}</p></td>
                            <td><p className='mt-3'>{blowerStats.wickets}</p></td>
                            <td><p className='mt-3'></p></td>
                        </>)}
                        {/* <td><p className='mt-3'>0.5</p></td>
                        <td><p className='mt-3'>0</p></td>
                        <td><p className='mt-3'>10</p></td>
                        <td><p className='mt-3'>1</p></td>
                        <td><p className='mt-3'>12</p></td> */}
                    </tr>
                </tbody>
        </Table>
            </div>
            <div className="bowling-stats d-flex justify-content-between">
                <p className="fw-bold text-capitalize">extras: <span>2</span></p>
                <p className="fw-bold">
                    wd: <span>1, </span>
                    nb: <span>1, </span>
                    b:  <span>0, </span> 
                    lb: <span>0 </span>
                </p>
            </div>
        </>
    );
};

export default Bowler;
