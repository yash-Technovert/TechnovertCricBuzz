import react, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate } from 'react-router';
type propType = {
  teamName: string[],
  teamOneDetails: number[],
  teamTwoDetails: number[],
  index: number,
  matchWinner: string,
  matchId:string
}


const MatchStatus = ({ teamName, teamOneDetails, teamTwoDetails, index, matchWinner, matchId }: propType) => {
  const navigate = useNavigate();
  const [matchWinnerStat, setMatchWinnerStat] = useState<string>('')
  useEffect(() => {
    if (teamOneDetails[0] > teamTwoDetails[0]) {
      setMatchWinnerStat(`won by ${teamOneDetails[0] - teamTwoDetails[0]} runs`)
    }
    else if (teamOneDetails[0] < teamTwoDetails[0]) {
      setMatchWinnerStat(`won by ${10 - teamTwoDetails[1]} wickets`)
    }
    else {
      setMatchWinnerStat('Match tied')
    }

  }, [])

  const handleClick=(e:any)=>{
    let matchId = e.target.getAttribute('data-bs-matchId');
    navigate('/', { state: { matchId: matchId } })
  }

  return (
    <Card  >
      <Card.Header className='d-flex'><p className=' fw-bold fs-4 m-auto'>Match {index + 1}</p></Card.Header>
      <Card.Body className='text-capitalize'>
        <Card.Title className='fw-bold text-nowrap'>{teamName[0]}</Card.Title><p className=' fs-lg-4 fs-sm-6 '>{teamOneDetails[0]}/{teamOneDetails[1]} ({teamOneDetails[2]})</p>
        <Card.Title className='fw-bold text-nowrap'>{teamName[1]}</Card.Title><p className=' fs-lg-4 fs-sm-6'>{teamTwoDetails[0]}/{teamTwoDetails[1]} ({teamTwoDetails[2]})</p>
        <hr></hr>
        <div className='text-capitalize fw-bold' style={{ minHeight: '1.6cm' }}>
          {matchWinner} {matchWinnerStat}
        </div>
        <div className='d-flex '><button type="button" onClick={handleClick} className="fw-bold btn btn-success m-auto fs-5" data-bs-matchid={matchId}>View Scorecard</button></div>
      </Card.Body>

    </Card>
  )
}

export default MatchStatus

