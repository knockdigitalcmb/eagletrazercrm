import { render,screen } from "@testing-library/react"; 
import User from "./index";

describe('User component',()=>{
  it('Should render User component',()=>{
    render(<User/>)
    const userElement=screen.getByTestId('create-user')
    expect(userElement).toBeInTheDocument();
  })

  it('Should render User button',()=>{
    render(<User/>)
    const userElementButton=screen.getByTestId('create-user-button')
    expect(userElementButton).toBeInTheDocument();
  })

})