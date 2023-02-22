import * as React from 'react'
import Batsman from './Batsman'
import Bowler from './bowler'
import CurrentOver from './CurrentOver'
import { Supabase } from '../api/supabase'
import { InningStatResponse } from '../models/Innings'
import { getScore } from '../api/match'
import { log } from 'console'
type PropsType = {
    isAdmin: boolean
}

const Live = ({ isAdmin }: PropsType) => {

    var data: InningStatResponse = {
        id: '',
        matchId: '',
        teamName: '',
        runsScored: 0,
        wickets: 0,
        oversPlayed: 0,
        isFirstInning: true,
        extras: {
            wide: 0,
            noBall: 0,
            bye: 0,
            legBye: 0,
        },
        four: 0,
        six: 0
    }
    const [crr, setCrr] = React.useState(0.0)
    const [inningData, setInningData] = React.useState<InningStatResponse>(data)
    const [inningId, setInningId] = React.useState<any>()
    const base = new Supabase()
    const channel = base.supabase
        .channel('table-db-changes').
        on('postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'InningStat',
                filter: `id=eq.${inningId}`,
            },
            (payload: any) => {
                data = payload.new
                console.log(payload.new)
                let setData = () => {
                    if (data.isFirstInning) {
                        if (data.wickets == 10 || data.oversPlayed >= 6) {
                            getCurrentScore()
                        }
                        else {

                            setInningData(data);
                            let crr = currentRunRate(data.runsScored, data.oversPlayed)
                            setCrr(crr);
                        }
                    }
                    else {
                        setInningData(data);
                        let crr = currentRunRate(data.runsScored, data.oversPlayed)
                        setCrr(crr);
                    }
                }
                setData()
            }).subscribe();

    const currentRunRate = (runsScored: any, oversPlayed: any) => {
        let balls = Math.floor(oversPlayed) * 6
        let rem = (oversPlayed - Math.floor(oversPlayed)) * 10
        let ballsPlayed = balls + rem
        return (runsScored / (ballsPlayed / 6))
    }

    const getCurrentScore = async () => {
        getScore('INDIAvAUSTRALIA:2/22/2023_1:40:48')
            .then((res: any) => {
                let inningID = res.data?.id
                setInningId(inningID)
                let setData = () => { setInningData(res.data); }
                setData()
                setCrr(currentRunRate(res.data?.runsScored, res.data?.oversPlayed));
                console.log(res.data?.extras)
            })
    }
    React.useEffect(() => {
        getCurrentScore()
    }, [inningId])


    return (
        <>
            <div className="scores d-flex justify-content-between py-2">
                <p className='fw-bold fs-4 mb-0'>{inningData.teamName}: <span>{inningData.runsScored}</span>/<span>{inningData.wickets} </span>(<span>{inningData.oversPlayed}</span>)</p>
                <p className='fw-bold fs-4 mb-0'>CRR: <span>{crr.toFixed(1)}</span></p>
            </div>
            <Batsman four={inningData.four} six={inningData.six} extras={inningData?.extras} isAdmin={isAdmin} ></Batsman>
            <Bowler isAdmin={isAdmin}></Bowler>
            <CurrentOver></CurrentOver>
        </>

    )
}
export default Live