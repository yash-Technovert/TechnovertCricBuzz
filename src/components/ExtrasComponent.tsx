import classNames from 'classnames';
import * as React from 'react';
import { extras } from '../enums/Match';

// @ts-ignore
const ExtrasComponent = ({ extra, setExtra, handleBall }) => {
  // @ts-ignore
  const getClass = (extraType) => {
    //let classes = 'btn btn-primary btn-sm m-1';
    //return extraType === extra ? `${classes} btn-accent` : classes;   
    return classNames('btn btn-sm m-1', {'btn-primary': extra !== extraType}, {'btn-accent': extra === extraType})
  };

  return (
    <div className="extra">
      <div className="d-flex extra-types">
         {extras.map((extra) => {
          return(<button className="btn btn-primary btn-sm m-1 py-3 px-5 fw-bold fs-6" onClick={() => {handleBall(extra);}}>{extra}</button>)
        })}
      </div>
    </div>
  );
};

export default ExtrasComponent;
