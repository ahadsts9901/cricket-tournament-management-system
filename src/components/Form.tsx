import { FormEvent, useState } from "react"
import { Team } from "../types"
import { Button, TextField } from "@mui/material"

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