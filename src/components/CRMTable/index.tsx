import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

interface CrmTableProps {
  rows: any[];
  columns: GridColDef[];
  pageSizeOptions: number[];
  loading: boolean;
  checkboxSelection: boolean;
}

const CRMTable = ({
  rows,
  columns,
  pageSizeOptions,
  loading,
  checkboxSelection,
}: CrmTableProps) => {
  return (
    <Box data-testid='crm-table-component' id='crm-table'>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={pageSizeOptions}
          sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
          disableRowSelectionOnClick
          checkboxSelection={checkboxSelection}
        />
      </Paper>
    </Box>
  );
};
export default CRMTable;
