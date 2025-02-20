import {cleanup, fireEvent, getByTestId, render,screen } from "@testing-library/react";
import OTPPage from "./index";

describe('OTP page component',()=>{
  afterEach(cleanup);
  it('should OTP page render',()=>{
    render(<OTPPage/>)
    const otpPageElement=screen.getByTestId('otpPage')
    expect(otpPageElement).toBeInTheDocument();
  })
  
  it('should render OTP input fields',()=>{
    render(<OTPPage/>)
      const otpInputs=screen.getByRole("textBox")
      expect(otpInputs).toHaveLength(6)
  }) 

  it('Should disable button when otp field is empty',()=>{
    render(<OTPPage/>)
    const otpButton=screen.getByTestId('otp-submit')
    expect(otpButton).toBeDisabled
  })

  it('Should enable button when otp field is filled',()=>{
    render(<OTPPage/>)
    
    const otpInputs=screen.getAllByRole("textbox")
    const otpButton=screen.getByTestId('otp-submit')
    otpInputs.forEach((input,index)=>{
      fireEvent.change(input,{target:{value:String(index+1)}})
    })
    expect(otpButton).toBeEnabled();
})
})