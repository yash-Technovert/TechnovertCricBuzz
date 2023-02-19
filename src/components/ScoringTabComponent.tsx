import { useState } from "react";
import { getCurrentInnings, getCurrentMatch, getCurrentOver, persistInnings, persistMatch, persistOver } from "../api/matchData";
import { Innings, Match, Over } from "../interfaces/Match";
import Live from "./Live";
import Scoring from "./Scoring";

export interface PropsForScoring {
    match: Match, setMatch: any, innings: Innings, setInnings: any
};

const ScoringTabComponent = ({ match, setMatch, innings, setInnings }: PropsForScoring) => {

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

    const [over, setOver] = useState(overData);
    const [bowler, setBowler] = useState(currentBowler);
    const [batsman1, setBatsman1] = useState(batsmen.batsman1);
    const [batsman2, setBatsman2] = useState(batsmen.batsman2);
    const [batsman, setBatsman] = useState('');
    const [facing, setFacing] = useState(batsmen.facing ? batsmen.facing : FIRST_BATSMAN);
    const [multiplier, setMultiplier] = useState(1);
    const [extra, setExtra] = useState('');
    const [error, setError] = useState('');
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

    const handleEndOver = () => {
        const inningData = { ...innings, overs: [...innings.overs, over] };

        setInnings(inningData);
        persistInnings(inningData);

        setOver({ bowler: '', balls: [] });
        persistOver({ bowler: '', balls: [] });

        persistMatch(match);
    };

    // @ts-ignore
    const handleFacing = (facingBatsman) => {
        setBatsman(facingBatsman === 1 ? batsman1 : batsman2);
        setFacing(facingBatsman);
    };

    const getBatsmenScore = (batsman: string) => {
        // @ts-ignore
        const score = innings.overs.reduce((acc, cur) => {
            // @ts-ignore
            return (acc += cur.balls.reduce((overAcc, overCur) => {
                if (overCur.batsman === batsman) {
                    overAcc += overCur.batsmanScore;
                }
                return overAcc;
            }, 0));
        }, 0);
        return score;
    };

    const displayScore = (): number => {
        // @ts-ignore
        const score = innings.overs.reduce((acc, cur) => {
            // @ts-ignore
            return (acc += cur.balls.reduce((overAcc, overCur) => {
                return (overAcc += overCur.score + overCur.extras);
            }, 0));
        }, 0);

        const overScore = over.balls.reduce((overAcc, currBall) => {
            return overAcc += currBall.score + currBall.extras;
        }, 0);
        return score + overScore;
    };

    const getWicketCount = (): number => {
        const inningWickets = innings.overs.reduce((acc, cur) => {
            // @ts-ignore
            return (acc += cur.balls.reduce((ballAcc, ballCur) => {
                return ballAcc += ballCur.wicket !== '' ? 1 : 0;
            }, 0));
        }, 0);
        const overWickets = over.balls.reduce((ballAcc, ballCur) => {
            return ballAcc += ballCur.wicket !== '' ? 1 : 0;
        }, 0);

        return inningWickets + overWickets;
    }

    const swapBatsman = () => {
        const swapped = facing !== FIRST_BATSMAN ? FIRST_BATSMAN : SECOND_BATSMAN;
        setFacing(swapped);
    }

    return(
        <div className="scoring-tab">
            <Live></Live>
            <div className="border border-dark my-2"></div>
            <Scoring></Scoring>
        </div>
    )
}

export default ScoringTabComponent;