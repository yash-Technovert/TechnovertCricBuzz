import * as React from 'react'
import Batsman from './Batsman'
import Bowler from './bowler'
import CurrentOver from './CurrentOver'
import { Supabase } from '../api/supabase'
import { InningStatResponse } from '../models/Innings'
import { useDispatch } from "react-redux";
import matchConstants from '../constants/matchConstants';
// @ts-ignore
import { useSelector } from "react-redux";
type PropsType = {
    isAdmin: boolean
}
const Live = ({isAdmin}:PropsType) => {

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
    const [inningData, setInningData] = React.useState(data)
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
                filter: 'id=eq.INDIAvAUSTRALIA:2/17/2023:I1',
                // `id=eq.${inningId}'
            },
            (payload: any) => {
                data = payload.new
                let setData = () => { setInningData(data); setCrr(data.runsScored / data.oversPlayed); }
                setData()
            }).subscribe();
    console.log("batsManOne",batsManOne)
    console.log("batsManTwo",batsManTwo)
    console.log("Team 2",teamTwoPlaying11)

    return (
        <>
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