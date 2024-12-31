import "./App.css"
import { Fragment, useEffect, useState } from "react";
import { State } from "./types";
import { Form } from "./components/Form";
import TabBar from "./components/TabBar";

const App = () => {
    const [state, set_state] = useState<State>({ teams: [], matches: [], overs: 0, standings: [] })
    const [value, setValue] = useState(0);

    useEffect(() => {
        const localState = localStorage.getItem("state")
        if (localState) {
            const parsed_state = JSON.parse(localState)
            set_state(parsed_state)
        } else {
            const newState: State = {
                teams: [],
                matches: [],
                overs: 0,
                standings: [],
            }
            set_state(newState)
            localStorage.setItem("state", JSON.stringify(newState))
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-4 p-2 bg-purple-100">
            {!value ? <Fragment>
                <h2 className="text-2xl text-center text-purple-700 font uppercase tracking-[8px] my-4">Cricket Tournament Management System</h2>
                <Form
                    set_state={set_state}
                    state={state}
                />
            </Fragment> : null}
            <TabBar state={state} set_state={set_state} value={value} setValue={setValue} />
        </div>
    )
}

export default App