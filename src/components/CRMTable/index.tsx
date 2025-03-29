import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import CRMTableNoData from '../CRMTableNoData/index';
import { GridSlotsComponent } from '@mui/x-data-grid';
interface CrmTableProps {
  rows: any[];
  columns: GridColDef[];
  pageSizeOptions: number[];
  loading: boolean;
  checkboxSelection: boolean;
  slots?: GridSlotsComponent;
  noDataMessage?: string;
}

const CRMTable = ({
  rows,
  columns,
  pageSizeOptions,
  loading,
  checkboxSelection,
  slots,
  noDataMessage,
}: CrmTableProps) => {
  return (
    <Box data-testid='crm-table-component' id='crm-table'>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          data-testid='crm-table'
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={pageSizeOptions}
          sx={{
            flex: 1, 
            height: '100%', 
            minHeight:rows.length===0 ? 300:0,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
          disableRowSelectionOnClick
          checkboxSelection={checkboxSelection}
          slots={{
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                }}
              >
                <CRMTableNoData message={`No ${noDataMessage} available`} />
              </Box>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};
export default CRMTable;
