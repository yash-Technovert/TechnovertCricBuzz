export class finishedMatchStats
{
    id!: string
    teamOneInningStat!: TeamStats
    teamTwoInningStat!: TeamStats
     tossWinner!: string
     matchWinner!: string
    matchTime!: string
}
class Extras{
    wide!: number
    noBall!: number
    bye!: number
    legBye!: number
}
class TeamStats
{
    teamName!: string
    runsScored!: number
    wickets!: number
    oversPlayed!: number
    isFirstInning!: boolean
    extras!: Extras
}