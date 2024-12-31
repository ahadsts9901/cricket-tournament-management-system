import "./App.css"
import { useEffect, useState } from "react";
import { State, Team } from "./types";
import { Form } from "./components/Form";
import TabBar from "./components/TabBar";

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
        <div className="w-screen h-screen flex flex-col justify-start items-center gap-4 p-2 bg-purple-50">
            <h2 className="text-4xl text-purple-700 font uppercase tracking-[8px] my-4">Title</h2>
            <Form
                set_teams={set_teams}
                teams={teams}
            />
            <TabBar state={state} set_state={set_state} />
        </div>
    )
}

export default App