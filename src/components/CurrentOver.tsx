import * as React from 'react';
import { useReducer, useState, useEffect } from 'react';
import MatchReducer, { initialState } from '../contexts/MatchReducer';

const CurrentOver = () => {
    const [state, dispatch] = useReducer(MatchReducer, initialState);
    const [over, setOver] = useState([]);

    useEffect(() => {
        setOver(state.currentOver);
    }, [state.currentOver]);

    return (
        <div className=" current-over bg-light">
            <div className=" d-flex justify-content-between p-3">
                <p className='fs-4 fw-bold m-0 align-self-center d-none d-lg-block'>Current Over:</p>
                {over.map((item, index) => {
                    return (
                        <p className='ball border border-2 border-dark px-lg-4 py-lg-3 px-2 m-0 bg-light text-dark fw-bold fs-4' key={index}>{item}</p>
                    );
                })
                }
            </div>
        </div>
    );
}

export default CurrentOver