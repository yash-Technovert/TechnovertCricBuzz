import { ListGroup, Tab, Table, Tabs } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getMatchInfo } from "../api/match";
import { Match } from "../models/Match";

// @ts-ignore
const MatchComponent = ({}) => {
  let match:Match={
    id: "",
    teamOne: "",
    teamTwo: "",
    tossWinner: "",
    tossDecision: "",
    matchWinner: "",
  };
  const [matchInfo, setMatchInfo] = useState(match)

  useEffect(() => {
    getMatchInfo("INDIAvAUSTRALIA:2/17/2023")
    .then((res:any) => {
      console.log(res)
      setMatchInfo(res.data[0])
    })
  },[])

  const team1Playing11 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
  return (
    <div className="match-info">
      <div className="match-details border border-muted border-2 rounded p-2 my-3">
        <p className="text-capitalize fw-bold fs-5 mb-0">match no: <span>1</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">between: <span>{matchInfo!.teamOne}</span> v <span>{matchInfo!.teamTwo}</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Toss: <span>{matchInfo!.tossWinner} opt to {matchInfo!.tossDecision}</span></p>
        <p className="text-capitalize fw-bold fs-5 mb-0">Venue: <span>retro drive inn, madhapur</span></p>
      </div>
      <div className="playing-11 d-flex rounded">
        <ListGroup className="col me-2 border">
          <ListGroup.Item className="fw-bold">{matchInfo.teamOne}</ListGroup.Item>
          {team1Playing11.map((player, index) => {
            return (
              <ListGroup.Item key={index} className=' text-capitalize fw-bold'>{player}</ListGroup.Item>
            )
          })
          }
        </ListGroup>
        <ListGroup className="col ms-2 border">
          <ListGroup.Item className="fw-bold ">{matchInfo.teamTwo}</ListGroup.Item>
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