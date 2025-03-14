import { fireEvent, render, screen } from '@testing-library/react';
import Roles from './index';
import { CRMServiceAPI } from '../../../services/CRMService';
jest.mock('../../../services/CRMService', () => ({
  CRMServiceAPI: {
    getUserRoleList: jest.fn(),
    createUserRole: jest.fn(),
    updateUserRole: jest.fn(),
    deleteUserRole: jest.fn(),
  },
}));

const mockRoles = [
  {
    id: 1,
    role: 'test',
    permission: { test1: true, test2: true },
  },
];

describe('Roles pages', () => {
  it('should render role page', () => {
    render(<Roles />);
    const rolesElement = screen.getByTestId('roles-page');
    expect(rolesElement).toBeInTheDocument();
  });

  it('should fetch and display roles', async () => {
    (CRMServiceAPI.getUserRoleList as jest.Mock).mockResolvedValue(mockRoles);
    render(<Roles />);
    expect(await screen.findByText('test')).toBeInTheDocument();
  });

  it('should open create role modal', async () => {
    (CRMServiceAPI.createUserRole as jest.Mock).mockResolvedValue(mockRoles);
    render(<Roles />);
    const createModal = screen.getByTestId('create-role-button');
    fireEvent.click(createModal);
    expect(await screen.findByText('test')).toBeInTheDocument();
  });

  it('should open view role when  role modal is clicked', async () => {
    (CRMServiceAPI.updateUserRole as jest.Mock).mockResolvedValue(mockRoles);
    render(<Roles />);
    const viewModal = screen.getByTestId('create-modal');
    fireEvent.click(viewModal);
    expect(await screen.findByText('test')).toBeInTheDocument();
  });
  
  it('should open when delete modal is clicked', async () => {
    (CRMServiceAPI.deleteUserRole as jest.Mock).mockResolvedValue(mockRoles);
    render(<Roles />);
    const deleteModal = screen.getByTestId('delete-modal');
    fireEvent.click(deleteModal);
    expect(await screen.findByText('test')).toBeInTheDocument();
  });
});
