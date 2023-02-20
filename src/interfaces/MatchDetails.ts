import { Team } from "./Match";

export interface MatchDetails {
    id: number;
    matchNo: number;
    date: Date;
    time: Date;
    toss: string;
    decidedTo: string;
    venue: string;
    Team1:Team;
    Team2:Team;
}    