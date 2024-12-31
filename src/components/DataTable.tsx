import "./index.css"
import { useEffect, useState } from 'react';
import { Standing } from '../types'
import { DataGrid } from '@mui/x-data-grid';
import { theme } from '../utils/mui-theme';

const DataTable = ({ data }: { data: Standing[] }) => {
    const [rows, set_rows] = useState<any[]>([])

    useEffect(() => {
        const processed_data = data?.map((d: Standing, i: number) => ({
            id: i,
            s_no: i + 1,
            team: d?.teamName,
            played: d?.matchesPlayed,
            wins: d?.wins,
            losses: d?.losses,
            ties: d?.ties,
            points: d?.points,
            run_rate: d?.netRunRate?.toFixed(2),
        }))
        set_rows(processed_data)
    }, [data])

    const columns = [
        { field: "s_no", headerName: "S.No", width: 80 },
        { field: "team", headerName: "Team", flex: 1 },
        { field: "wins", headerName: "Won", flex: 1 },
        { field: "losses", headerName: "Lose", flex: 1 },
        { field: "ties", headerName: "Tie", flex: 1 },
        { field: "points", headerName: "Points", flex: 1 },
        { field: "run_rate", headerName: "NRR", flex: 1 },
    ]

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            hideFooterSelectedRowCount
            disableColumnSelector
            className="custom-table-sts"
            localeText={{ noRowsLabel: 'No data available' }}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[2, 4, 8, 10, 20, 50]}
            style={{
                borderRadius: 0, textTransform: "capitalize",
                width: "100%", borderColor: "#acacac",
                color: theme.palette.primary.dark,
            }}
        />
    )
}

export default DataTable
