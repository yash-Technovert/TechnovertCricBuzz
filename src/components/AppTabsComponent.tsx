import { useState,useEffect } from 'react';
import { getCurrentInnings, getCurrentMatch, persistInnings, persistMatch } from '../api/matchData';
import { useAuth } from '../contexts/AuthProvider';
import MatchComponent from './MatchComponent';
import ScoringTabComponent from './ScoringTabComponent';
import Live from './Live';
import { Tabs, Tab } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

// @ts-ignore
import { useDispatch, useSelector } from "react-redux";
import getPlayersStats from '../action/MatchInfo/getPlayingPlayersStats';
const AppTabsComponent = () => {
    const [isAdmin, setIsAdmin] = useState<any>(true);
    const { onLogout } = useAuth();
    const [activeTab, setActiveTab] = useState('Scoring');
    const { state } = useLocation();
    const { matchId } = state;

    const dispatch = useDispatch<any>();

    const handleEndMatch = () => {
        handleEndInnings();

        localStorage.removeItem('currentMatch');
        localStorage.removeItem('currentInnings');

        const newMatch = getCurrentMatch();
        const newInnings = getCurrentInnings(newMatch.id);
        setMatch(newMatch);
        setInnings(newInnings);
    };

    const handleEndInnings = () => {
        const matchData = { ...match, innings: { ...match.innings, [innings.id]: innings } };
        setMatch(matchData);
        persistMatch(matchData);
        localStorage.removeItem('currentInnings');
        localStorage.removeItem('currentOver');
        localStorage.removeItem('currentBowler');
        localStorage.removeItem('currentBatsmen');

        const inningData = getCurrentInnings(match.id);
        persistInnings(inningData);
        setInnings(inningData);
    };
    return (
        <div className="bg-white container my-4 p-3 border border-0 rounded-3">
            <Tabs
                defaultActiveKey="live"
                id="justify-tab-example"
                className="fw-bold p-2 m-0"
                justify
            >
                <Tab eventKey="match-center" title="Match Center">
                    <MatchComponent isAdmin={false} matchId={matchId} />
                </Tab>
                <Tab eventKey="live" title="Live">
                    <Live isAdmin={false} matchId={matchId} />
                </Tab>
                {isAdmin && <Tab eventKey="scoring" title="Scoring">
                    <ScoringTabComponent />
                </Tab>}
            </Tabs>
        </div>
    );
};

export default AppTabsComponent;