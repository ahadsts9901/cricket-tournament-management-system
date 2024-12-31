import "./App.css"
import { useState } from "react";
import { TbBuildingBridge2 } from "react-icons/tb";
import { themeData } from "./utils/mui-theme";
import { TextField } from "@mui/material";

export const Form = () => {
    return (
        <div>
            <TextField />
        </div>
    )
}

const App = () => {
    const [state, set_state] = useState({})

    return (
        <div className="w-screen h-screen flex flex-col justify-start items-center gap-4 p-4 bg-purple-50">
            <h2 className="text-4xl text-purple-700 font uppercase tracking-[8px]">Title</h2>
            <Form />
        </div>
    )
}

export default App