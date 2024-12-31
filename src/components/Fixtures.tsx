import "./index.css"
import { Match, State, Team } from "../types"
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SingleMatch = ({ match, index, state, set_state }: { match: Match, index: number, state: State, set_state: any }) => {

    const [full_match, set_full_match] = useState<Match>(match)

    return (
        <div className="single-match">
            <div className="w-full flex justify-start items-center gap-2">
                <p className="w-[75px] text-left text-purple-800">{`${index + 1})`}</p>
                <TextField style={{ width: "80px" }} placeholder="Runs"
                    value={full_match.team1.runs}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, runs: e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Wickets"
                    value={full_match.team1.wickets}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, wickets: e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Overs"
                    value={full_match.team1.overs}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, overs: e.target.value } })}
                />
            </div>
            <p className="capitalize">{match.team1.teamName}</p>
            <p>vs</p>
            <p className="capitalize">{match.team2.teamName}</p>
            <div className="w-full flex justify-end items-center gap-2">
                <TextField style={{ width: "80px" }} placeholder="Runs" 
                value={full_match.team1.runs}
                onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, runs: e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Wickets" />
                <TextField style={{ width: "80px" }} placeholder="Overs" />
                <Button variant="outlined" color="primary" sx={{ width: "65px" }}>Save</Button>
            </div>
        </div>
    )
}

const Fixtures = ({ state, set_state }: any) => {

    const generateMatches = (teams: Team[]) => {
        const matches: Match[] = [];

        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                const newMatch = {
                    team1: { ...teams[i], overs: 0, runs: 0, wickets: 0 },
                    team2: { ...teams[j], overs: 0, runs: 0, wickets: 0 }
                };

                const matchExists = matches.some((match: any) =>
                    (match.team1.id === newMatch.team1.id && match.team2.id === newMatch.team2.id) ||
                    (match.team1.id === newMatch.team2.id && match.team2.id === newMatch.team1.id)
                );

                if (!matchExists) matches.push(newMatch);
            }
        }

        return matches;
    };

    const sortMatches = (matches: { team1: Team; team2: Team }[]) => {
        const sorted: { team1: Team; team2: Team }[] = [];

        const schedule: { team1: Team; team2: Team }[] = [];

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            schedule.push(match);
        }

        let index = 0;
        while (index < schedule.length) {
            const match = schedule[index];

            if (sorted.length === 0 || (sorted[sorted.length - 1].team1.id !== match.team1.id && sorted[sorted.length - 1].team1.id !== match.team2.id)) {
                sorted.push(match);
                index++;
            } else {
                schedule.push(match);
                index++;
            }
        }

        return sorted;
    };

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateFixtures = () => {
        if (!state?.teams) return
        if (state?.teams?.length <= 1) return
        const generatedMatches = generateMatches(state?.teams)
        const shuffledMatches = shuffleArray(generatedMatches)
        const sortedMatches = sortMatches(shuffledMatches)
        const newState = {
            ...state,
            matches: sortedMatches
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center flex-wrap">
                <h2 className="text-left uppercase tracking-[4px] text-purple-700 text-2xl mb-2 mr-4">Fixtures</h2>
                <Button className="w-[180px]" color="primary" variant="outlined"
                    onClick={generateFixtures}
                >Generate Fixtures</Button>
            </div>
            <div className="w-full flex flex-col p-2 gap-2 teams-cont">
                {state?.matches ? state?.matches?.map((match: Match, i: number) => (
                    <SingleMatch match={match} state={state} set_state={set_state} key={i} index={i} />
                )) : null}
            </div>
        </div>
    )
}

export default Fixtures