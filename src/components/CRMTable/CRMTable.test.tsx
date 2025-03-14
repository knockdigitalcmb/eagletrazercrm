import { render, screen } from '@testing-library/react';
import CRMTable from './index';

const mockRows = [{ id: 1, role: 'test' }];
const mockColumns = [
  { field: 'id', headerName: 'testid' },
  { field: 'role', headerName: 'testRole' },
];
const renderCRMTable = () => {
  render(
    <CRMTable
      rows={mockRows}
      columns={mockColumns}
      pageSizeOptions={[5, 10]}
      loading={false}
      checkboxSelection={false}
    />
  );
};

describe('CRMTable Component', () => {
  it('should render crm table ', () => {
    renderCRMTable();
    const crmTableElement = screen.getByTestId('crm-table-component');
    expect(crmTableElement).toBeInTheDocument
  });
  it('should display row ',()=>{
    renderCRMTable();
    const crmTable = screen.getByTestId('crm-table');
    expect(crmTable).toBeInTheDocument()
    })
});
