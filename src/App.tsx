import "./App.css"
import { FormEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Team } from "./types";

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
    const [state, set_state] = useState({})
    const [teams, set_teams] = useState<Team[]>([])

    useEffect(() => {
        set_state({
            ...state,
            teams: teams
        })
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