export class finishedMatchStats
{
    matchId!: string
    teamOne!: string
    teamTwo!: string
    teamOneInningStat!: TeamStats
    teamTwoInningStat!: TeamStats
    matchWinner!: string
}

export class ongoingMatchStats
{
    matchId!: string
    teamOne!: string
    teamTwo!: string
    teamOneInningStat!: TeamStats
    teamTwoInningStat!: TeamStats
    tossWinner!: string
    tossDecision!: string
}
class TeamStats
{
    runsScored!: number
    wickets!: number
    oversPlayed!: number
}