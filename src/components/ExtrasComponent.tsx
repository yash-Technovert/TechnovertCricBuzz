import * as React from 'react';
import { extras } from '../enums/Match';

// @ts-ignore
const ExtrasComponent = () => {
  // @ts-ignore
  return (
    <div className="extra">
      <div className="d-flex extra-types">
         {extras.map((extra) => {
          return(<button className="btn btn-primary btn-sm m-1 py-3 px-5 fw-bold fs-6" onClick={() =>{}}>{extra}</button>)
        })}
      </div>
    </div>
  );
};

export default ExtrasComponent;
