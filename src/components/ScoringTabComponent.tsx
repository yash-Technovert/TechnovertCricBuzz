import Live from "./Live";
import Scoring from "./Scoring";

const ScoringTabComponent = () => {

    return(
        <div className="scoring-tab">
            <Live isAdmin={true} matchId={''} />
            <div className="border border-dark my-2"></div>
            <Scoring/>
        </div>
    )
}

export default ScoringTabComponent;