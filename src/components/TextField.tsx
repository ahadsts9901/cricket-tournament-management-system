import { TextField as Text } from "@mui/material"

const TextField = (props: any) => {
    return (
        <Text
            {...props}
            style={{
                borderRadius: "0px"
            }}
        />
    )
}

export default TextField