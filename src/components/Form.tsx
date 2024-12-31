import { FormEvent, useState } from "react"
import { Team } from "../types"
import { Button, TextField } from "@mui/material"

export const Form = ({ state, set_state }: any) => {
    const [team, set_team] = useState("")

    const addTeam = (e: FormEvent) => {
        e.preventDefault()
        if (!team) return
        const newTeam: Team = { teamName: team, id: state?.teams?.length + 1 || 1 }
        const newState = {
            ...state,
            teams: [newTeam, ...state?.teams]
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
        set_team("")
    }

    return (
        <form className="w-full flex gap-4 flex-wrap justify-end p-2" onSubmit={addTeam}>
            <TextField
                fullWidth
                onChange={(e: any) => set_team(e.target.value)}
                value={team}
                placeholder="Enter team name"
            />
            <Button className="w-[120px]" color="primary" variant="outlined">Add Team</Button>
            <Button className="w-[120px]" color="primary" variant="outlined">Reset</Button>
        </form>
    )
}