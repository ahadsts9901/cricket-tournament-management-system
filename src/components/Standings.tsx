import { Button, TextField } from "@mui/material";
import { Match, Team } from "../types";

const Standings = ({ state, set_state }: any) => {

    const convertOversToBalls = (overs: number) => {
        const [oversPart, ballsPart] = overs.toString().split('.').map(Number);
        return (oversPart * 6) + (ballsPart || 0);
    }

    const update_standings = () => {
        const standings = state.teams.map((team: Team) => {
            const teamStats = {
                teamName: team.teamName,
                matchesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                totalRuns: 0,
                totalBalls: 0,
                netRunRate: 0,
                points: 0,
            };

            state.matches.forEach((match: Match) => {
                if ((match.team1.id === team.id && match.team1.runs) || (match.team2.id === team.id && match.team2.runs)) {
                    teamStats.matchesPlayed += 1;
                    if (match.team1.id === team.id) {
                        teamStats.totalRuns += match.team1.runs;
                        teamStats.totalBalls += convertOversToBalls(match.team1.overs);
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
                        teamStats.totalBalls += convertOversToBalls(match.team2.overs); // Convert overs to balls
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

            // Calculate total runs conceded and total balls bowled
            const totalRunsConceded = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    return acc + match.team2.runs;
                } else if (match.team2.id === team.id) {
                    return acc + match.team1.runs;
                }
                return acc;
            }, 0);

            const totalBallsBowled = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    return acc + convertOversToBalls(match.team2.overs);
                } else if (match.team2.id === team.id) {
                    return acc + convertOversToBalls(match.team1.overs);
                }
                return acc;
            }, 0);

            // Calculate Net Run Rate
            teamStats.netRunRate = teamStats.totalBalls > 0 ?
                (teamStats.totalRuns / teamStats.totalBalls) - (totalRunsConceded / totalBallsBowled) : 0;

            return teamStats;
        });
        console.log("standings", standings);
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
            <div className="w-full flex justify-start items-center gap-2">
                <p className="text-left capitalize text-purple-900">Total Overs:</p>
                <TextField />
            </div>
        </div>
    )
}

export default Standings