import React, {createContext} from 'react';
import { InningStatResponse } from '../models/Innings';

export const MatchContext = createContext('')

export const MatchProvider = (props:any)  => { 
    return(
        <MatchContext.Provider value={''}>
            {props.children}
        </MatchContext.Provider>
    )
}