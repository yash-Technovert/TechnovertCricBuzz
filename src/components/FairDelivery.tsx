import React from "react";
import { fairDelivery } from "../enums/Match";
// @ts-ignore
const FairDelivery = ({ setMultiplier, handleBall }) => {
  // @ts-ignore
  const getClass = (currentMultiplier) => {
    const classes = "btn btn-secondary m-1";
  }

  return (
    <div className="mb-2">
      <div className="d-flex">
        {fairDelivery.map((delivery) => {
          return(<button className="btn btn-primary btn-sm m-1 px-3" onClick={() => {handleBall(delivery);}}>{delivery}</button>)
        })}
      </div>
    </div>
  )
}

export default FairDelivery;