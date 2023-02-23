import * as React from 'react';
import { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'

// @ts-ignore
const Bowler = (props) => {
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
                                    <Form.Select aria-label="Default select example">
                                        <option>Bowler</option>
                                        <option value="1">Bowler</option>
                                        <option value="2">Bowler</option>
                                        <option value="3">Bowler</option>
                                    </Form.Select>
                                    :
                                    <p className='mt-2 mb-0'>Bowler</p>
                                }
                            </td>
                            <td><p className='mt-3'>0.5</p></td>
                            <td><p className='mt-3'>0</p></td>
                            <td><p className='mt-3'>10</p></td>
                            <td><p className='mt-3'>1</p></td>
                            <td><p className='mt-3'>12</p></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="bowling-stats d-flex justify-content-between">
                <p className="fw-bold text-capitalize">extras: <span>2</span></p>
                <p className="fw-bold">
                    wd: <span>{props.wide || 0}, </span>
                    nb: <span>{props.noBall || 0} </span>
                    {/* b:  <span>0, </span> 
                    lb: <span>0 </span> */}
                </p>
            </div>
        </>
    );
};

export default Bowler;
