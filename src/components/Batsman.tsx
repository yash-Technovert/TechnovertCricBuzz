import * as React from 'react';
import { useState } from 'react';
import {Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'

// @ts-ignore
import { useSelector } from "react-redux";
const Batsman = (props:any) => {
    const TeamOne = useSelector((state:any)=>state?.matchInfo?.teamOne)
    const TeamTwo = useSelector((state:any)=>state?.matchInfo?.teamTwo)
    const changeTeamHandler = () =>{
        
    }
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
                                <span><b>{TeamOne}</b></span>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <label>Boaling:  </label>
                            </div>
                            <div className='col-md-5'>
                                <span><b>{TeamTwo}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-4'>
                <form onClick={changeTeamHandler}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Select Batting Team  </label>
                        </div>
                        <div className='col-md-6'>
                            <select className='form-select'>
                                <option>{TeamOne}</option>
                                <option>{TeamTwo}</option>
                            </select>
                        </div>
                    </div>
                </form>
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
                                <Form.Select aria-label="Default select example">
                                    <option>Batsman</option>
                                    <option value="1">Batsman</option>
                                    <option value="2">Batsman</option>
                                    <option value="3">Batsman</option>
                                </Form.Select>
                                :
                                <p className='mt-2 mb-0'>Batsman</p>
                            }
                        </td>
                        <td><p className='mt-3'>40</p></td>
                        <td><p className='mt-3'>36</p></td>
                        <td><p className='mt-3'>2</p></td>
                        <td><p className='mt-3'>1</p></td>
                        <td><p className='mt-3'>120</p></td>
                    </tr>
                    <tr className='py-5'>
                        <td className='ps-3 pe-5 py-3 col-6'>
                            {props.isAdmin ? 
                                <Form.Select aria-label="Default select example">
                                    <option>Batsman</option>
                                    <option value="1">Batsman</option>
                                    <option value="2">Batsman</option>
                                    <option value="3">Batsman</option>
                                </Form.Select>
                                :
                                <p className='mt-2 mb-0'>Batsman</p>
                            }
                        </td>
                        <td><p className='mt-3'>40</p></td>
                        <td><p className='mt-3'>36</p></td>
                        <td><p className='mt-3'>2</p></td>
                        <td><p className='mt-3'>1</p></td>
                        <td><p className='mt-3'>120</p></td>
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
