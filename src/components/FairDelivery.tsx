import React from "react";
import { updateScore } from "../api/match";
import { fairDelivery } from "../enums/Match";
// @ts-ignore
const FairDelivery = ({ setMultiplier, handleBall }) => {
  // @ts-ignore
  const updateScores = async (delivery) => {
    let updates={
      runsScored:0,
      oversPlayed:0.3
    }
    await updateScore('INDIAvAUSTRALIA:2/17/2023:I1',updates);

  }

  return (
    <div className="mb-2">
      <div className="d-flex">
        {fairDelivery.map((delivery) => {
          return(<button className="btn btn-primary btn-sm m-1 p-3 px-5 fw-bold fs-6" onClick={() => {updateScores(delivery)}}>{delivery}</button>)
        })}
      </div>
    </div>
  )
}

export default FairDelivery;