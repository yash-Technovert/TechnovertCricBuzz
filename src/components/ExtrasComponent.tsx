import * as React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { extras } from '../enums/Match';
import './../assets/styles/match.css'

// @ts-ignore
const ExtrasComponent = () => {
  const [runsOnExtras, setRunsOnExtras] = React.useState<number>(0)
  const [extraRun, setExtraRun] = React.useState<number>(1)
  const [extraType, setExtraType] = React.useState<string>('')

  const handleChange = (e: any) => {
    if (e.target.value) {
      setExtraRun(parseInt(e.target.value) + 1)
    }
  }
  const handleExtra = (e: any) => {
    console.log(e.target.innerText)
    switch (e.target.innerText) {
      case 'Wide':
        setExtraType('WD')
        break;
      case 'NoBall':
        setExtraType('NB')
        break;
      case 'Bye':
        setExtraType('B')
        break;
      case 'LegBye':
        setExtraType('LB')
        break;
      default:
        setExtraType('')
        break;
    }
  }
  // @ts-ignore
  return (
    <div className="extra">
      <div className="d-flex extra-types">
        {extras?.map((extra,index) => {
          return (
            <OverlayTrigger
              trigger="click"
              key={index}
              placement={'top'}
              overlay={
                <Popover id={'top'} className="py-4">
                  <Popover.Body>
                    <p>
                      <span className='fw-bold'>{extraType} +</span>
                      <input type="number" className='extras-input px-4' onChange={handleChange} />
                      <span className='fs-5 fw-bold'>= {extraRun + runsOnExtras}</span>
                    </p>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button className="btn btn-primary btn-sm m-1 py-3 px-5 fw-bold fs-6" key={index} onClick={handleExtra}>{extra}</Button>
            </OverlayTrigger>
          );
        })}
      </div>
    </div>
  );
};

export default ExtrasComponent;
