import { Button } from "@mui/material"
import { Team } from "../types"
import { MdEdit, MdDelete } from "react-icons/md";
import { Fragment, useState } from "react";
import ConfirmAlertMUI from "./ConfirmAlertMUI";

export const SingleTeam = ({ team, state, set_state }: any) => {
    const [alert_data, set_alert_data] = useState<any>({})
    const [is_alert_open, set_is_alert_open] = useState(false)

    const confirmDeletion = () => {
        if (!team?.id) return
        set_alert_data({
            title: "Delete team?",
            description: "Are ou sure you want to delete this team?. The action cannot be undone",
            fun: () => delete_team(team?.id)
        })
        set_is_alert_open(true)
    }

    const delete_team = (teamId: number) => {
        if (!teamId) return
        const updated_teams = state?.teams?.filter((team: Team) => team?.id != teamId)
        set_state({
            ...state,
            teams: updated_teams
        })
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

            <div className="w-full flex justify-between items-center gap-2">
                <p className="w-full text-left text-purple-800 capitalize overflow-hidden whitespace-nowrap text-ellipsis">{team?.teamName}</p>
                <div className="w-fit flex justify-center items-center gap-2">
                    <Button color="primary" variant="outlined" sx={{ height: "30px" }}><MdEdit style={{ fontSize: "1.2em" }} /></Button>
                    <Button color="primary" variant="outlined" sx={{ height: "30px" }} onClick={confirmDeletion}><MdDelete style={{ fontSize: "1.2em" }} /></Button>
                </div>
            </div>
        </Fragment>
    )
}

const Teams = ({ state, set_state }: any) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="w-full text-left uppercase tracking-[4px] text-purple-700 text-2xl mb-2">Teams</h2>
            {state?.teams?.map((team: Team, i: number) => (
                <SingleTeam key={i} team={team} state={state} set_state={set_state} />
            ))}
        </div>
    )
}

export default Teams