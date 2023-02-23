import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import MatchComponent from './MatchComponent';
import ScoringTabComponent from './ScoringTabComponent';
import Live from './Live';
import { Tabs, Tab } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AppTabsComponent = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { onLogout } = useAuth();
    const [activeTab, setActiveTab] = useState('Scoring');
    const { state } = useLocation();
    const { matchId } = state;
    return (
        <div className="bg-white container my-4 p-3 border border-0 rounded-3">
            <Tabs
                defaultActiveKey={isAdmin ? "scoring" : "live"}
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
                {!isAdmin && <Tab eventKey="scoring" title="Scoring">
                    <ScoringTabComponent />
                </Tab>}
            </Tabs>
        </div>
    );
};

export default AppTabsComponent;
