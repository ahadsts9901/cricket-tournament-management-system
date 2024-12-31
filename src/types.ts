export interface Team {
    teamName: string
    id: number
}

export interface State {
    teams: Team[]
}

export interface MatchSingleTeam extends Team {
    overs: number
    runs: number
    wickets: number
}

export interface Match {
    team1: MatchSingleTeam
    team2: MatchSingleTeam
}