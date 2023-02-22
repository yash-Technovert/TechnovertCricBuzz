import Card from 'react-bootstrap/Card';
type propType={
    teamName: string[],
    teamOneDetails:number[],
    teamTwoDetails:number[],
    index:number,
    matchWinner:string
}

 const MatchStatus = ({teamName,teamOneDetails,teamTwoDetails,index,matchWinner}:propType) => {
  return (
    <Card  className='border border-dark'>
      <Card.Header className='d-flex'><p className=' fw-bold fs-4 m-auto'>Match {index+1}</p></Card.Header>
      <Card.Body className='text-capitalize'>
        <Card.Title className='fw-bold text-nowrap'>{teamName[0]}</Card.Title><p className=' fs-lg-4 fs-sm-6 '>{teamOneDetails[0]}/{teamOneDetails[1]} ({teamOneDetails[2]}.0 Overs )</p>
        <Card.Title className='fw-bold text-nowrap'>{teamName[1]}</Card.Title><p className=' fs-lg-4 fs-sm-6'>{teamTwoDetails[0]}/{teamTwoDetails[1]} ({teamTwoDetails[2]}.0 Overs )</p>
        <hr></hr>
        <div className='text-capitalize fw-bold' style={{minHeight:'1.6cm'}}>
           {matchWinner} won the match!!
        </div>
        <div className='d-flex '><button type="button" className="fw-bold btn btn-success m-auto fs-5">Match Center</button></div>
        </Card.Body>

    </Card>
  )
}

export default MatchStatus