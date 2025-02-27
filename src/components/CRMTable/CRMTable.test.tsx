import { render, screen } from '@testing-library/react';
import CRMTable from './index';
import { GridColDef } from '@mui/x-data-grid';

const mockColumns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 30 },
  { field: 'name', headerName: 'Name', width: 100 },
];
const mockRows = [
  { id: 1, name: 'john' },
  { id: 2, name: 'Joe' },
];

describe('Crm Table Component', () => {
  it('should render crm table component', () => {
    render(<CRMTable columns={mockColumns} rows={mockRows} />);
    const crmTableElement = screen.getByTestId('crm-table-component');
    expect(crmTableElement).toBeInTheDocument();
  });
  it('should render rowsId', () => {
    render(<CRMTable columns={mockColumns} rows={mockRows} />);
    const rowsId = screen.getByText('Id');
    expect(rowsId).toBeInTheDocument();
  });
  it('should render rowsName', () => {
    render(<CRMTable columns={mockColumns} rows={mockRows} />);
    const rowsName = screen.getByText('Name');
    expect(rowsName).toBeInTheDocument();
  });
});
