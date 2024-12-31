import "./App.css"
import { useEffect, useState } from "react";
import { State } from "./types";
import { Form } from "./components/Form";
import TabBar from "./components/TabBar";

const App = () => {
    const [state, set_state] = useState<State>({ teams: [] })

    useEffect(() => {
        const localState = localStorage.getItem("state")
        if (localState) {
            const parsed_state = JSON.parse(localState)
            set_state(parsed_state)
        } else {
            const newState = {
                teams: []
            }
            set_state(newState)
            localStorage.setItem("state", JSON.stringify(newState))
        }
    }, [])

    console.log("state", state)

    return (
        <div className="w-screen h-screen flex flex-col justify-start items-center gap-4 p-2 bg-purple-50">
            <h2 className="text-4xl text-purple-700 font uppercase tracking-[8px] my-4">Title</h2>
            <Form
                set_state={set_state}
                state={state}
            />
            <TabBar state={state} set_state={set_state} />
        </div>
    )
}

export default App