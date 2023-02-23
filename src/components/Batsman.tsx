import * as React from 'react';
import { useState } from 'react';
import {Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'
import { PlayerStat } from '../models/PlayerStat';
import { Supabase } from '../api/supabase';

// @ts-ignore
const Batsman = (props) => {
    var data: PlayerStat = {
        id: '',
        matchId: '',
        runs: 0,
        six: 0,
        four: 0,
        ballsPlayed: 0,
        wickets: 0,
        overs: 0,
        runsConceded: 0,
        maiden: 0,
        name: '',
        disableBatting: false,
        disableBowling: false
    }
    const [Partnetship, setPartnership] = useState(0)
    const [Batsman1, setBatsman1] = useState(0)
    const [Batsman2, setBatsman2] = useState(0)
    const [onStrike, setOnStrike] = useState(0)
    const [playerId, setPlayerId] = useState<any>()
    const [matchId, setmatchId] = useState<any>()
    const [playerStat, setPlayerStat] = useState<PlayerStat>(data);
    const base = new Supabase();
    const channel = base.supabase
        .channel('table-db-changes').
        on('postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'PlayerStat',
                filter: `id=eq.${playerId} && matchId=eq.${matchId}`,
            },
            (payload: any) => {
                let setData = () => {
                    data = payload.new 
                    setPlayerStat(data);
                    console.log("DATA ===>",data);
                    console.log("PLayerStat -->", playerStat);
                    
                }
                setData()
            }).subscribe();
  return (
    <>
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
