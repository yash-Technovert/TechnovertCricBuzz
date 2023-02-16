import { match } from 'assert';
import * as React from 'react'
import { MdDelete } from 'react-icons/md';
import { getCurrentOver, persistOver, persistInnings, persistMatch } from '../api/matchData';
import ExtrasComponent from './ExtrasComponent';
import FairDelivery from './FairDelivery';
import WicketComponent from './WicketComponent';
const Scoring=()=>{
    const FIRST_BATSMAN = 1;
    const SECOND_BATSMAN = 2;

    const overData = getCurrentOver();

    const getCurrentBatsman = () => {
        const currentBatsman = localStorage.getItem('currentBatsmen');
        if (!currentBatsman) {
            return { batsman1: '', batsman2: '', facinc: 1 };
        } else {
            return JSON.parse(currentBatsman);
        }
    }

    const getCurrentBowler = () => {
        const currentBowler = localStorage.getItem('currentBowler');
        if (!currentBowler) {
            return '';
        } else {
            return JSON.parse(currentBowler);
        }
    }

    const batsmen = getCurrentBatsman();
    const currentBowler = getCurrentBowler();

    const [over, setOver] = React.useState(overData);
    const [bowler, setBowler] = React.useState(currentBowler);
    const [batsman1, setBatsman1] = React.useState(batsmen.batsman1);
    const [batsman2, setBatsman2] = React.useState(batsmen.batsman2);
    const [batsman, setBatsman] = React.useState('');
    const [facing, setFacing] = React.useState(batsmen.facing ? batsmen.facing : FIRST_BATSMAN);
    const [multiplier, setMultiplier] = React.useState(1);
    const [extra, setExtra] = React.useState('');
    const [error, setError] = React.useState('');
    const ballTemplate = {
        bowler: '',
        batsman: '',
        ball: '',
        wicket: '',
        score: 0,
        extras: 0,
        bowlerScore: 0,
        batsmanScore: 0,
        symbol: '',
        multiplier: 1,
    };
    // @ts-ignore
    const handleBall = (runs, ballType = 'FAIR') => {
        if (!bowler || !batsman1 || !batsman2 || !facing) {
            setError('No bowler or batsman set. Please ensure both is set correctly.');
            return;
        }

        const batsman = facing === FIRST_BATSMAN ? batsman1 : batsman2;

        ballType = extra !== '' ? extra : ballType;

        const newBall = { ...ballTemplate, ball: ballType, bowler, batsman, multiplier };
        switch (ballType) {
            case 'FAIR':
                newBall.score = runs * multiplier;
                newBall.batsmanScore = newBall.score;
                newBall.bowlerScore = newBall.score;
                newBall.symbol = `${runs}`;
                break;
            case 'WIDE':
                newBall.extras = 1 + runs;
                newBall.batsmanScore = 0;
                newBall.bowlerScore = newBall.extras;
                newBall.symbol = `${runs}WD`;
                break;
            case 'NOBALL':
                newBall.extras = 1 + runs;
                newBall.batsmanScore = 0;
                newBall.bowlerScore = newBall.extras;
                newBall.symbol = `${runs}NB`;
                break;
            // should this be here?? byes should be extra, does it count against the bowler though?
            case 'BYE':
                newBall.extras = 0 + runs;
                newBall.symbol = `${runs}B`;
                break;
            case 'LEGBYE':
                newBall.extras = 0 + runs;
                newBall.symbol = `${runs}LB`;
                break;
            case 'CAUGHT':
            case 'BOWLED':
            case 'RUNOUT':
            case 'STUMPED':
                newBall.score = 0;
                newBall.wicket = ballType;
                newBall.symbol = `W`;
                break;
        }

        const balls = [...over.balls, newBall];
        setOver({ ...over, balls });
        persistOver({ ...over, balls });

        if (runs % 2 !== 0) {
            setFacing(facing === FIRST_BATSMAN ? SECOND_BATSMAN : FIRST_BATSMAN);
        }

        setExtra('');
        setMultiplier(1);
    };
    return(
        <>
        
        <div className="d-flex justify-content-between">
            <FairDelivery
            setMultiplier={setMultiplier}
            handleBall={handleBall}
        />
        <ExtrasComponent
            extra={extra}
            setExtra={setExtra}
            handleBall={handleBall}
        />
        </div>
        <div className="d-flex">
            <WicketComponent handleBall={handleBall} />
            <button className='btn btn-danger ms-auto px-5 fs-4 border rounded-5'><MdDelete/></button>
        </div>
        </>
    )
}
export default Scoring