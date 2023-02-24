import React, { useReducer } from "react";
import { updateScore, } from "../api/match";
import { fairDelivery } from "../enums/Match";
import MatchReducer, { initialState } from "../contexts/MatchReducer";
import { useDispatch, useSelector } from "react-redux";
import matchConstants from "../constants/matchConstants";
// @ts-ignore
const FairDelivery = () => {
  // @ts-ignore
  // const [state, dispatch] = useReducer(MatchReducer, initialState)
  const dispatch = useDispatch<any>();
  const currentOverStat:any = useSelector<any>((state: any) => {
    return state?.matchInfo?.currentOver;
  })
  const fairBallsCountStat:any = useSelector<any>((state: any) => {
    return state?.matchInfo?.fairBallsCount;
  })
  const updateCurrentOver = (ball: number) => {
    console.log("from update current over",ball);
    console.log(currentOverStat, fairBallsCountStat);
    dispatch({ type: matchConstants.UPDATE_CURRENT_OVER, payload: { 
      currentOver: [...currentOverStat, ball],
      fairBallsCount: fairBallsCountStat + 1 
    } })
  }
  return (
    <div className="mb-2">
      <div className="d-flex">
        {fairDelivery?.map((delivery, index) => {
          return (<button className="btn btn-primary btn-sm m-1 p-3 px-5 fw-bold fs-6" key={index} onClick={() => { updateCurrentOver(delivery) }}>{delivery}</button>)
        })}
      </div>
    </div>
  )
}

export default FairDelivery;