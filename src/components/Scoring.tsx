import * as React from 'react'
import { MdDelete } from 'react-icons/md';
import ExtrasComponent from './ExtrasComponent';
import FairDelivery from './FairDelivery';
import WicketComponent from './WicketComponent';
const Scoring = () => {
    return (
        <>
            <div className="d-flex justify-content-between">
                <FairDelivery />
                <ExtrasComponent />
            </div>
            <div className="d-flex">
                <WicketComponent />
                <button className='btn btn-danger ms-auto px-5 fs-4 border rounded-5'><MdDelete /></button>
            </div>
        </>
    )
}
export default Scoring