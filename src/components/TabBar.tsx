import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Teams from './Teams';
import Fixtures from './Fixtures';
import Standings from './Standings';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabBar = ({ state, set_state, value, setValue }: any) => {

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: "100%", mt: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab style={{ fontSize: "0.8em" }} label="Teams" {...a11yProps(0)} />
                    <Tab style={{ fontSize: "0.8em" }} label="Fixtures" {...a11yProps(1)} />
                    <Tab style={{ fontSize: "0.8em" }} label="Standings" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >
                <Teams state={state} set_state={set_state} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} >
                <Fixtures state={state} set_state={set_state} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2} >
                <Standings state={state} set_state={set_state} />
            </CustomTabPanel>
        </Box>
    );
}

export default TabBar
