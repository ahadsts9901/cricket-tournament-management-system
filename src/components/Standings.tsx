import { Button, TextField } from "@mui/material";
import { Match, Team } from "../types";
import { useState } from "react";

const Standings = ({ state, set_state }: any) => {
    const [overs, set_overs] = useState(state?.overs)

    const convertOversToBalls = (overs: number) => {
        const [oversPart, ballsPart] = overs.toString().split('.').map(Number);
        return (oversPart * 6) + (ballsPart || 0);
    }

    const update_standings = () => {
        const totalOversForNRR = state?.overs; // Fixed overs for NRR calculation
        const totalBallsForNRR = totalOversForNRR * 6; // Convert overs to balls

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
                    let isAllOut = false; // Flag to check if the team is all out

                    if (match.team1.id === team.id) {
                        teamStats.totalRuns += match.team1.runs;
                        teamStats.totalBalls += convertOversToBalls(match.team1.overs);
                        isAllOut = match.team1.wickets === 10; // Check if team1 is all out
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
                        teamStats.totalBalls += convertOversToBalls(match.team2.overs);
                        isAllOut = match.team2.wickets === 10; // Check if team2 is all out
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

                    // If the team is all out, set total balls faced for NRR to totalBallsForNRR
                    if (isAllOut) {
                        teamStats.totalBalls = totalBallsForNRR; // Set to 120 balls (20 overs)
                    }
                }
            });

            // Calculate total runs conceded
            const totalRunsConceded = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    return acc + match.team2.runs;
                } else if (match.team2.id === team.id) {
                    return acc + match.team1.runs;
                }
                return acc;
            }, 0);

            // Calculate total balls bowled
            const totalBallsBowled = state.matches.reduce((acc: any, match: any) => {
                if (match.team1.id === team.id) {
                    // If team1 is bowling, check if team2 is all out
                    if (match.team2.wickets === 10) {
                        return acc + totalBallsForNRR; // Set to totalBallsForNRR if team2 is all out
                    }
                    return acc + convertOversToBalls(match.team2.overs); // Add total overs bowled
                } else if (match.team2.id === team.id) {
                    // If team2 is bowling, check if team1 is all out
                    if (match.team1.wickets === 10) {
                        return acc + totalBallsForNRR; // Set to totalBallsForNRR if team1 is all out
                    }
                    return acc + convertOversToBalls(match.team1.overs); // Add total overs bowled
                }
                return acc;
            }, 0);

            // Calculate Net Run Rate
            const ballsFacedForNRR = teamStats.totalBalls; // Use the adjusted total balls
            teamStats.netRunRate = ballsFacedForNRR > 0 ?
                (teamStats.totalRuns / ballsFacedForNRR) - (totalRunsConceded / totalBallsBowled) : 0;

            return teamStats;
        });

        const newState = {
            ...state,
            standings: standings
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
    }

    const saveOvers = () => {
        if (!overs) return
        if (state?.overs == overs) return
        const new_state = {
            ...state,
            overs: overs
        }
        set_state(new_state)
        localStorage.setItem("state", JSON.stringify(new_state))
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
                <TextField
                    type="number"
                    sx={{ width: "100px" }}
                    value={overs}
                    onChange={(e: any) => set_overs(e?.target?.value)}
                />
                <Button onClick={saveOvers} variant="outlined" color="primary">Save</Button>
            </div>
        </div>
    )
}

export default Standings
