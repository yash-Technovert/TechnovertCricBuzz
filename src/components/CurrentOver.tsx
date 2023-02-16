import * as React from 'react';
import { useState } from 'react';

const CurrentOver = () => {
    const [over, setOver] = useState([]);
    const temp=[1,2,3,0,2,2]

    return (
        <div className=" current-over bg-light">
            <div className=" d-flex justify-content-between p-3">
                <p className='fs-4 fw-bold m-0 align-self-center d-none d-lg-block'>Current Over:</p>
                {temp.map((item, index) => {
                    return (
                        <p className='ball border border-2 border-dark px-lg-4 py-lg-3 px-2 m-0 bg-light text-dark fw-bold fs-4'>{item}</p>
                    );
                })
                }
            </div>
        </div>
    );
}

export default CurrentOver