import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";

 interface CrmTableProps {
   rows: any[];
   columns: GridColDef[];
   pageSizeOptions?:number[]
 }

const CRMTable=({rows,columns,pageSizeOptions=[5,10]}:CrmTableProps)=>{
  return (
    <Box data-testid='crm-table-component'>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={pageSizeOptions}
          sx={{  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"}}
        />
      </Paper>
    </Box>
  );
}
export default CRMTable;