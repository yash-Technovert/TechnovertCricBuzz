import { useState } from 'react';
import { getCurrentInnings, getCurrentMatch, persistInnings, persistMatch } from '../api/matchData';
import { useAuth } from '../contexts/AuthProvider';
import MatchComponent from './MatchComponent';
import ScoringTabComponent from './ScoringTabComponent';
import Live from './Live';
import { Tabs, Tab } from 'react-bootstrap';

const AppTabsComponent = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const { onLogout } = useAuth();

    const matchData = getCurrentMatch();
    const inningData = getCurrentInnings(matchData.id);

    const [match, setMatch] = useState(matchData);
    const [innings, setInnings] = useState(inningData);

    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [activeTab, setActiveTab] = useState('Scoring');

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
                defaultActiveKey={isAdmin? "scoring" : "live"}
                id="justify-tab-example"
                className="fw-bold p-2 m-0"
                justify
            >
                <Tab eventKey="match-center" title="Match Center">
                    <MatchComponent/>
                </Tab>
                <Tab eventKey="live" title="Live">
                    <Live isAdmin={false} />
                </Tab>
                <Tab eventKey="scoring" title="Scoring">
                    <ScoringTabComponent/>
                </Tab>
            </Tabs>
        </div>
    );
};

export default AppTabsComponent;