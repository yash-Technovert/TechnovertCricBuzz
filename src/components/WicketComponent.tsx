import * as React from 'react';
import { wicket } from '../enums/Match';

// @ts-ignore
const WicketComponent = ({ handleBall }) => {
  return (
    <div className="wickets">
      <div className="d-flex wicket-types">
         {wicket.map((wicket) => {
          return(<button className="btn btn-primary btn-sm m-1 px-3" onClick={() => {handleBall(wicket);}}>{wicket}</button>)
        })}
      </div>
    </div>
  )
}

export default WicketComponent;