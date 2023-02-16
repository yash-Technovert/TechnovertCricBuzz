import * as React from 'react'
import Batsman from './Batsman'
import Bowler from './bowler'
import CurrentOver from './CurrentOver'

const Live = () => {
    return(
       <>
        <div className="scores d-flex justify-content-between py-2">
            <p className='fw-bold fs-4 mb-0'>SRH: <span>15</span>/<span>0 </span>(<span>0.5</span>)</p>
            <p className='fw-bold fs-4 mb-0'>CRR: <span>7.7</span></p>
        </div>
        <Batsman></Batsman>
        <Bowler></Bowler>
        <CurrentOver></CurrentOver>
       </>

    )
}
export default Live