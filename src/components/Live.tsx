import * as React from 'react'
import Batsman from './Batsman'
import Bowler from './bowler'
import CurrentOver from './CurrentOver'
import { Supabase } from '../api/supabase'
import { InningStatResponse } from '../models/Innings'
import { getScore } from '../api/match'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import matchConstants from '../constants/matchConstants';
// @ts-ignore

type PropsType = {
    isAdmin: boolean
    matchId: string
}

const Live = ({ isAdmin, matchId }: PropsType) => {

    let matchIdFromState = useSelector((state: any) => state.matchInfo?.matchInfo.matchId)


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

    const [teamOne,setTeamOne] = React.useState<string>("");
    const [teamTwo,setTeamTwo] = React.useState<string>("");
    const [teamOnePlayers,setTeamOnePlayers] = React.useState<any>([]);
    const [teamTwoPlayers,setTeamTwoPlayers] = React.useState<any>([]);
    const [isChangeTeam,setIsSetTeam]= React.useState<any>(false);
    const [batsManOne,setBatsManOne] = React.useState<any>();
    const [batsManTwo,setBatsManTwo] = React.useState<any>();
    const [currentBolwer,setCurrentBolwer] = React.useState<any>();
    const TeamOneName = useSelector((state:any)=>state?.matchInfo?.teamOne)
    const TeamTwoName = useSelector((state:any)=>state?.matchInfo?.teamTwo)
    const teamOnePlaying11 = useSelector((state:any)=>state?.matchInfo?.teamOnePlaying11)
    const teamTwoPlaying11 = useSelector((state:any)=>state?.matchInfo?.teamTwoPlaying11)
    const dispatch = useDispatch<any>();

    React.useEffect(()=>{
        const setUpState = async() =>{            
            setTeamOne(TeamOneName)
            setTeamTwo(TeamTwoName)
            setTeamOnePlayers(teamOnePlaying11)
            setTeamTwoPlayers(teamTwoPlaying11)
        }
        setUpState();
    },[isChangeTeam])

    const changeTeamHandler = async(e:any) =>{
        e.preventDefault();
        await dispatch({
            type: matchConstants.CHANGE_TEAMS,
            payload: {
                "TeamOneName":teamOne,
                "TeamTwoName":teamTwo,
                "teamOnePlayers":teamOnePlayers,
                "teamTwoPlayers":teamTwoPlayers
            },
        })    
        setIsSetTeam(!isChangeTeam)
        setBatsManOne(undefined)
        setBatsManTwo(undefined)
        setCurrentBolwer(undefined)

    }
    
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
    console.log("batsManOne",batsManOne)
    console.log("batsManTwo",batsManTwo)
    console.log("Team 2",teamTwoPlaying11)

    const currentRunRate = (runsScored: any, oversPlayed: any) => {
        let balls = Math.floor(oversPlayed) * 6
        let rem = (oversPlayed - Math.floor(oversPlayed)) * 10
        let ballsPlayed = balls + rem
        return (runsScored / (ballsPlayed / 6))
    }

    const requiredRunRate = (runsTowin: number, oversRemaining: number) => {
        let balls = Math.floor(oversRemaining) * 6
        let rem = (oversRemaining - Math.floor(oversRemaining)) * 10
        let ballsRemaining = balls + rem
        return (runsTowin / (ballsRemaining / 6))
    }

    const getCurrentScore = async () => {
        getScore(matchId)
            .then((res: any) => {
                console.log(res.data)
                let inningID = res.data?.id
                setInningId(inningID)
                let setData = () => { setInningData(res.data); }
                setData()
                setCrr(currentRunRate(res.data?.runsScored, res.data?.oversPlayed));
            })
    }
    React.useEffect(() => {
        getCurrentScore()
    }, [inningId, matchId, isAdmin])

    React.useEffect(() => {
        if (matchId.length <= 1) {
            matchId = matchIdFromState
        }
    }, [matchId, matchIdFromState])


    return (
        <>
            {!inningData.isFirstInning && <div className="target d-flex justify-content-between py-2 bg-dark text-white">
                <p className='fw-bold fs-5 mb-0'>Target</p>
                <p className='fw-bold fs-5 mb-0'>RRR</p>
            </div>}
            <div className="scores d-flex justify-content-between py-2">
                <p className='fw-bold fs-4 mb-0'>{teamOne}: <span>{inningData.runsScored}</span>/<span>{inningData.wickets} </span>(<span>{inningData.oversPlayed}</span>)</p>
                <p className='fw-bold fs-4 mb-0'>CRR: <span>{crr.toFixed(1)}</span></p>
            </div>
            <Batsman four={inningData.four} six={inningData.six} isAdmin={isAdmin} teamOne={teamOne} teamTwo={teamTwo} teamOnePlayers={teamOnePlayers} changeTeamHandler={changeTeamHandler} setBatsManOne={setBatsManOne} setBatsManTwo={setBatsManTwo} batsManOne={batsManOne} batsManTwo={batsManTwo} teamOnePlaying11={teamOnePlaying11}></Batsman>
            <Bowler isAdmin={isAdmin} teamTwoPlayers={teamTwoPlayers} teamTwoPlaying11={teamTwoPlaying11} currentBolwer={currentBolwer} setCurrentBolwer={setCurrentBolwer}></Bowler>
            <CurrentOver></CurrentOver>
        </>

    )
}
export default Live