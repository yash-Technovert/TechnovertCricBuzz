import * as React from 'react'
import Batsman from './Batsman'
import Bowler from './bowler'
import CurrentOver from './CurrentOver'
import { Supabase } from '../api/supabase'
import { InningStatResponse } from '../models/Innings'
import { useEffect } from 'react'
import { getScores } from '../api/match'

const Live = () => {
    let id='INDIAvAUSTRALIA:2/17/2023:I1'
    let matchId='INDIAvAUSTRALIA:2/17/2023'
    var data:InningStatResponse = {
        id: '',
        matchId: '',
        teamName:'',
        runsScored: 0,
        wickets: 0,
        oversPlayed: 0,
        isFirstInning:true,
        extras:{
            wide:0,
            noBall:0,
            bye:0,
            legBye:0,
        },
        four:0,
        six:0

    }
    const [crr,setCrr]=React.useState(0.0)
    const [inningData,setInningData]=React.useState(data)
    const base= new Supabase()
    const channel = base.supabase
        .channel('table-db-changes').
        on('postgres_changes',
        {
            event: 'UPDATE',
            schema: 'public',
            table: 'InningStat',
            filter: 'id=eq.INDIAvAUSTRALIA:2/17/2023:I1',
            // `id=eq.${inningId}'
        },
         (payload:any) => {
            data = payload.new
            let setData=()=>{setInningData(data); setCrr(data.runsScored/data.oversPlayed);}
            setData()
        }).subscribe();

        useEffect(() => {
            getScores(id,matchId).then((res:any)=>{
                console.log(res)
                setInningData(res.data)
                setCrr(res.data.runsScored/res.data.oversPlayed)
            })
        },[])
    return(
       <>
        <div className="scores d-flex justify-content-between py-2">
            <p className='fw-bold fs-4 mb-0'>SRH: <span>{inningData.runsScored}</span>/<span>{inningData.wickets} </span>(<span>{inningData.oversPlayed}</span>)</p>
            <p className='fw-bold fs-4 mb-0'>CRR: <span>{crr.toFixed(1)}</span></p>
        </div>
        <Batsman four={inningData.four} six={inningData.six} ></Batsman>
        <Bowler ></Bowler>
        <CurrentOver></CurrentOver>
       </>

    )
}
export default Live