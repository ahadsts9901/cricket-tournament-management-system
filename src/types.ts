export interface Team {
    teamName: string
    id: number
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

export interface State {
    teams: Team[],
    matches: Match[],
}
