export class MatchDetails
{
    matchId!: string
    teamOne!: string
    teamTwo!: string
    matchWinner!:string
    teamOnePlayerStats!:PlayerStats[]
    teamTwoPlayerStats!:PlayerStats[]
    teamOneStats!:InningsStats
    teamTwoStats!:InningsStats

}



export class PlayerStats
{
    matchId!: string
    inningsId!: string
    runs!: number
    balls!:number
    four!: number
    six!:number
    wickets!: number
    maiden!:number
    runsConceded!:number
    over!:number
    name!:string
}
class InningsStats
{
    teamName!: string
    runsScored!: number
    wickets!: number
    oversPlayed!:number
    isFirstInnings!: boolean
    wide!:number
    noBall!: number
}