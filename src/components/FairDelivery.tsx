import React, { useReducer } from "react";
import { updateScore, } from "../api/match";
import { fairDelivery } from "../enums/Match";
import MatchReducer, { initialState } from "../contexts/MatchReducer";
// @ts-ignore
const FairDelivery = () => {
  console.log(fairDelivery)
  // @ts-ignore
  const [state, dispatch] = useReducer(MatchReducer, initialState)

  const updateCurrentOver = (ball: number) => {
    dispatch({ type: "UPDATE_CURRENT_OVER", payload: { currentOver: [...state.currentOver, ball] } })
  }
  return (
    <div className="mb-2">
      <div className="d-flex">
        {fairDelivery?.map((delivery: any, index:any) => {          
          return (<button className="btn btn-primary btn-sm m-1 p-3 px-5 fw-bold fs-6" key={index} onClick={() => { updateCurrentOver(delivery) }}>{delivery}</button>)
        })}
      </div>
    </div>
  )
}

export default FairDelivery;