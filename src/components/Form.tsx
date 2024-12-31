import { FormEvent, Fragment, useState } from "react"
import { State, Team } from "../types"
import { Button, TextField } from "@mui/material"
import ConfirmAlertMUI from "./ConfirmAlertMUI"

export const Form = ({ state, set_state }: any) => {
    const [team, set_team] = useState("")
    const [is_alert_open, set_is_alert_open] = useState(false)
    const [alert_data, set_alert_data] = useState<any>({})

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

    const reset_app = () => {
        const newState: State = {
            matches: [],
            teams: [],
        }
        set_state(newState)
        localStorage.setItem("state", JSON.stringify(newState))
        set_is_alert_open(false)
    }

    const confirmResetApp = () => {
        set_alert_data({
            title: "Reset all data",
            description: "Are you sure you want to delete all the data in the app?. The action cannot be undone",
            fun: reset_app
        })
        set_is_alert_open(true)
    }

    return (
        <Fragment>
            <ConfirmAlertMUI
                open={is_alert_open}
                setOpen={set_is_alert_open}
                title={alert_data?.title}
                description={alert_data?.description}
                fun={alert_data?.fun}
            />
            <form className="w-full flex gap-4 flex-wrap justify-end p-2" onSubmit={addTeam}>
                <TextField
                    fullWidth
                    onChange={(e: any) => set_team(e.target.value)}
                    value={team}
                    placeholder="Enter team name"
                />
                <Button className="w-[120px]" color="primary" variant="outlined" type="submit">Add Team</Button>
                <Button className="w-[120px]" color="primary" variant="outlined" onClick={confirmResetApp}>Reset</Button>
            </form>
        </Fragment>
    )
}