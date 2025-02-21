import { fireEvent, render,screen } from "@testing-library/react"; 
import User from "./index";

jest.mock('../../../components/SidePanel', () => jest.fn(() => <div data-testid='side-panel' />));

describe('User Page',()=>{
  it('should render User page',()=>{
    render(<User/>)
    const userElement=screen.getByTestId('create-user')
    expect(userElement).toBeInTheDocument();
  })

  it('should render User button',()=>{
    render(<User/>)
    const userElementButton=screen.getByTestId('create-user-button')
    expect(userElementButton).toBeInTheDocument();
  })
  it('should opens a new tab when Create User button is clicked', () => {
    window.open = jest.fn();
    render(<User />);
    fireEvent.click(screen.getByTestId('create-user-button'));
    expect(window.open).toHaveBeenCalledWith('/create-user', '_blank');
  });

})