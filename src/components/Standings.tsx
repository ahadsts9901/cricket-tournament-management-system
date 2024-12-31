import { Match, Team } from "../types";

const Standings = ({ state, set_state }: any) => {

    console.log(state)

    const update_standings = () => {
        const standings = state.teams.map((team: Team) => {
            const teamStats = {
                teamName: team.teamName,
                matchesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                totalRuns: 0,
                totalOvers: 0,
                netRunRate: 0,
            };

            state.matches.forEach((match: Match) => {
                if (match.team1.id === team.id || match.team2.id === team.id) {
                    teamStats.matchesPlayed += 1;
                    if (match.team1.id === team.id) {
                        teamStats.totalRuns += match.team1.runs;
                        teamStats.totalOvers += match.team1.overs;
                        if (match.team1.runs > match.team2.runs) {
                            teamStats.wins += 1;
                        } else if (match.team1.runs < match.team2.runs) {
                            teamStats.losses += 1;
                        } else {
                            teamStats.ties += 1;
                        }
                    } else {
                        teamStats.totalRuns += match.team2.runs;
                        teamStats.totalOvers += match.team2.overs;
                        if (match.team2.runs > match.team1.runs) {
                            teamStats.wins += 1;
                        } else if (match.team2.runs < match.team1.runs) {
                            teamStats.losses += 1;
                        } else {
                            teamStats.ties += 1;
                        }
                    }
                }
            });

            // Calculate Net Run Rate
            const totalOversFaced = teamStats.totalOvers;
            const totalRunsConceded = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    return acc + match.team2.runs;
                } else if (match.team2.id === team.id) {
                    return acc + match.team1.runs;
                }
                return acc;
            }, 0);

            const totalOversBowled = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    return acc + match.team2.overs;
                } else if (match.team2.id === team.id) {
                    return acc + match.team1.overs;
                }
                return acc;
            }, 0);

            teamStats.netRunRate = totalOversFaced > 0 ?
                (teamStats.totalRuns / totalOversFaced) - (totalRunsConceded / totalOversBowled) : 0;

            return teamStats;
        });
        console.log("standings", standings)
    }

    return (
        <div>Standings</div>
    )
}

export default Standings