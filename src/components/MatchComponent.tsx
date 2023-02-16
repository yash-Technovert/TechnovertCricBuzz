import { ListGroup, Tab, Table, Tabs } from "react-bootstrap"

// @ts-ignore
const MatchComponent = ({ team1, setTeam1, team2, setTeam2, handleEndMatch, handleEndInnings }) => {
  const team1Playing11 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
  return (
    <div className="match-info">
      <h2 className="mt-2">Match Info</h2>
      <div className="match-details border border-muted border-2 rounded p-2">
        <p className="text-capitalize fw-bold fs-5 mb-0">match no: <span>1</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">between: <span>team1</span> v <span>team2</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Date: <span>25/2/2023</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Time: <span>10:30 PM</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Toss: <span>Team1 opt to bowl</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Venue: <span>retro drive inn, madhapur</span></p>
      </div>
      <h2 className="mt-2">Playing 11</h2>
      <div className="playing_11 d-flex rounded">
        <ListGroup className="col me-2 border">
          <ListGroup.Item className="fw-bold">Team 1</ListGroup.Item>
          {team1Playing11.map((player, index) => {
            return (
              <ListGroup.Item key={index} className=' text-capitalize fw-bold'>{player}</ListGroup.Item>
            )
          })
          }
        </ListGroup>
        <ListGroup className="col ms-2 border">
          <ListGroup.Item className="fw-bold ">Team 2</ListGroup.Item>
          {team1Playing11.map((player, index) => {
            return (
              <ListGroup.Item key={index} className=' text-capitalize fw-bold'>{player}</ListGroup.Item>
            )
          })
          }
        </ListGroup>
      </div>
    </div>
  )
}

export default MatchComponent;