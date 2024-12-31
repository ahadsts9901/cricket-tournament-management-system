import "./index.css"
import { Match, State, Team } from "../types"
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState } from "react";

export const ExampleHeader = () => {
    return (
        <div className="single-match main bg-purple-100 sticky top-0 z-10 pt-2">
            <div className="flex justify-start items-center gap-2">
                <p className="index w-[65px] second"></p>
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Runs"
                />
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Wickets"
                />
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Overs"
                />
            </div>
            <div className="second flex justify-end items-center gap-2">
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Runs"
                />
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Wickets"
                />
                <TextField style={{ width: "80px" }}
                    className="index"
                    value="Overs"
                />
                <p className="index w-[65px]"> </p>
            </div>
        </div>
    )
}

export const SingleMatch = ({ match, index, state, set_state }: { match: Match, index: number, state: State, set_state: any }) => {

    const [full_match, set_full_match] = useState<Match>(match)

    const saveMatch = () => {
        const matches = state?.matches
        matches[index] = full_match
        const newState = {
            ...state,
            matches: matches
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
    }

    return (
        <div className="single-match">
            <div className="flex justify-start items-center gap-2">
                <p className="index w-[65px] text-left text-purple-800">{`${index + 1})`}</p>
                <TextField style={{ width: "80px" }} placeholder="Runs"
                    className="index" type="number"
                    value={full_match.team1.runs}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, runs: +e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Wickets"
                    className="index" type="number"
                    value={full_match.team1.wickets}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, wickets: +e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Overs"
                    className="index" type="number"
                    value={full_match.team1.overs}
                    onChange={(e: any) => set_full_match({ ...full_match, team1: { ...full_match.team1, overs: +e.target.value } })}
                />
            </div>
            <p className="capitalize text-purple-900">{match.team1.teamName} v {match.team2.teamName}</p>
            <div className="flex justify-end items-center gap-2">
                <TextField style={{ width: "80px" }} placeholder="Runs"
                    className="index" type="number"
                    value={full_match.team2.runs}
                    onChange={(e: any) => set_full_match({ ...full_match, team2: { ...full_match.team2, runs: +e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Wickets"
                    className="index" type="number"
                    value={full_match.team2.wickets}
                    onChange={(e: any) => set_full_match({ ...full_match, team2: { ...full_match.team2, wickets: +e.target.value } })}
                />
                <TextField style={{ width: "80px" }} placeholder="Overs"
                    className="index" type="number"
                    value={full_match.team2.overs}
                    onChange={(e: any) => set_full_match({ ...full_match, team2: { ...full_match.team2, overs: +e.target.value } })}
                />
                <Button variant="outlined" color="primary" sx={{ width: "65px" }} className="index"
                    onClick={saveMatch}
                >Save</Button>
            </div>
        </div>
    )
}

const Fixtures = ({ state, set_state }: any) => {

    const [duplicates, set_duplicates] = useState(false)

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

        if (duplicates) {
            return [...matches, ...matches]
        } else {
            return matches
        }
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
        if (state?.teams?.length <= 1) {
            const newState = {
                ...state,
                matches: []
            }
            set_state(newState)
            localStorage.setItem("state", JSON.stringify(newState))
            set_duplicates(false)
            return
        }
        const generatedMatches = generateMatches(state?.teams)
        const shuffledMatches = shuffleArray(generatedMatches)
        const newState = {
            ...state,
            matches: shuffledMatches
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
        set_duplicates(false)
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center flex-wrap gap-2 mb-2">
                <h2 className="text-left uppercase tracking-[4px] text-purple-700 text-2xl mb-2 mr-4">Fixtures</h2>
                <div className="flex justify-start items-center gap-2 flex-wrap">
                    <Button className="w-[180px]" color="primary" variant="outlined"
                        onClick={generateFixtures}
                    >Generate Fixtures</Button>
                </div>
            </div>
            <FormControlLabel
                control={<Switch size="small" checked={duplicates} sx={{ mr: 1, ml: 1 }}
                    onChange={(e: any) => set_duplicates(e?.target?.checked)}
                />} label="Duplicate Matches" />
            <div className="w-full flex flex-col p-2 pt-0 gap-2 teams-cont others-cont">
                <ExampleHeader />
                {state?.matches ? state?.matches?.map((match: Match, i: number) => (
                    <SingleMatch match={match} state={state} set_state={set_state} key={i} index={i} />
                )) : null}
            </div>
        </div>
    )
}

export default Fixtures