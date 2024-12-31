import { Button } from "@mui/material";
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
                points: 0,
            };

            state.matches.forEach((match: Match) => {
                if ((match.team1.id === team.id && match.team1.runs) || (match.team2.id === team.id && match.team2.runs)) {
                    teamStats.matchesPlayed += 1;
                    if (match.team1.id === team.id) {
                        teamStats.totalRuns += match.team1.runs;
                        teamStats.totalOvers += match.team1.overs;
                        if (match.team1.runs > match.team2.runs) {
                            teamStats.wins += 1;
                            teamStats.points += 2;
                        } else if (match.team1.runs < match.team2.runs) {
                            teamStats.losses += 1;
                        } else {
                            teamStats.ties += 1;
                            teamStats.points += 1;
                        }
                    } else {
                        teamStats.totalRuns += match.team2.runs;
                        teamStats.totalOvers += match.team2.overs;
                        if (match.team2.runs > match.team1.runs) {
                            teamStats.wins += 1;
                            teamStats.points += 2;
                        } else if (match.team2.runs < match.team1.runs) {
                            teamStats.losses += 1;
                        } else {
                            teamStats.ties += 1;
                            teamStats.points += 1;
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
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center flex-wrap gap-2 mb-2">
                <h2 className="text-left uppercase tracking-[4px] text-purple-700 text-2xl mb-2 mr-4">Fixtures</h2>
                <div className="flex justify-start items-center gap-2 flex-wrap">
                    <Button className="w-[180px]" color="primary" variant="outlined"
                        onClick={update_standings}
                    >Update Standings</Button>
                </div>
            </div>
        </div>
    )
}

export default Standings