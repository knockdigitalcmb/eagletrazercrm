import { fireEvent, render,screen } from "@testing-library/react";
import SidePanel from "./index";

describe('SidePanel Component',()=>{
  it('should render side panel component',()=>{
    render(<SidePanel menu="Dashboard"/>)
    const sidePanelElement=screen.getByTestId('dashboard-page')
    expect(sidePanelElement).toBeInTheDocument
  })

  it('should toggle the drawer when menu icon is clicked',()=>{
    render(<SidePanel menu="Dashboard"/>)
    const menuIcon=screen.getByTestId('menu-icon')
    fireEvent.click(menuIcon)
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();                          
  })

  it("should render the slide bar list items",()=>{
    render(<SidePanel menu={"Dashboard"}/>)
    const menuItems=screen.getAllByTestId('list-item')
    expect(menuItems.length).toBeGreaterThan(0);
  })

  it("should navigate when clicking on list item",()=>{
    render(<SidePanel menu='Dashboard'/>)
    const listItem=screen.getByTestId('list-item')
    fireEvent.click(listItem)
    expect(listItem).toHaveClass('active')
  })
})