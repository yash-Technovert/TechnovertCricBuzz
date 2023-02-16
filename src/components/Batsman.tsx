import * as React from 'react';
import { useState } from 'react';
import { Dropdown, Form, Table } from 'react-bootstrap';
import './../assets/styles/match.css'

// @ts-ignore
const Batsman = () => {
  const FIRST_BATSMAN = 1;
  const SECOND_BATSMAN = 2;
  const [batsman1, setBatsman1] = useState('');
  const [batsman2, setBatsman2] = useState('');

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
                        <Form.Select aria-label="Default select example">
                            <option >Batsman</option>
                            <option value="1">Batsman</option>
                            <option value="2">Batsman</option>
                            <option value="3">Batsman</option>
                        </Form.Select>
                    </td>
                    <td><p className='mt-3'>40</p></td>
                    <td><p className='mt-3'>36</p></td>
                    <td><p className='mt-3'>2</p></td>
                    <td><p className='mt-3'>1</p></td>
                    <td><p className='mt-3'>120</p></td>
                </tr>
                <tr className='py-5'>
                    <td className='ps-3 pe-5 py-3 col-6'>
                        <Form.Select aria-label="Default select example">
                            <option>Batsman</option>
                            <option value="1">Batsman</option>
                            <option value="2">Batsman</option>
                            <option value="3">Batsman</option>
                        </Form.Select>
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
        <p className='fw-bold'>4s: <span>2</span>, 6s: <span>1</span></p>
    </div>
    </>
  );
};

export default Batsman;
