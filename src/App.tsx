import "./App.css"
import { FormEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { State, Team } from "./types";

export const Form = ({ teams, set_teams }: any) => {
    const [team, set_team] = useState("")

    const addTeam = (e: FormEvent) => {
        e.preventDefault()
        if (!team) return
        const newTeam: Team = { teamName: team, id: teams.length + 1 }
        set_teams((prev: Team[]) => [newTeam, ...prev])
        set_team("")
    }

    return (
        <form className="w-full flex gap-4" onSubmit={addTeam}>
            <TextField
                fullWidth
                onChange={(e: any) => set_team(e.target.value)}
                value={team}
            />
            <Button className="w-[150px]" color="primary" variant="outlined">Add Team</Button>
        </form>
    )
}

const App = () => {
    const [state, set_state] = useState<State>({ teams: [] })
    const [teams, set_teams] = useState<Team[]>(state?.teams)

    useEffect(() => {
        const localState = localStorage.getItem("state")
        if (localState) {
            set_state(JSON.parse(localState))
        } else {
            set_state({
                teams: []
            })
        }
    }, [])

    useEffect(() => {
        const newState = {
            ...state,
            teams: teams
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
    }, [teams])

    console.log("state", state)

    return (
        <div className="w-screen h-screen flex flex-col justify-start items-center gap-4 p-4 bg-purple-50">
            <h2 className="text-4xl text-purple-700 font uppercase tracking-[8px]">Title</h2>
            <Form
                set_teams={set_teams}
                teams={teams}
            />
        </div>
    )
}

export default App