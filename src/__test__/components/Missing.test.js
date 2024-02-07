import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Missing from '../../components/Missing';

const buildApp = () => {
  const renderApp = render(
    <BrowserRouter>
      <Missing/>
    </BrowserRouter>
  )
  return renderApp;
}

describe("Missing", () => {

  it("should render successfully", () => {
    buildApp()

    const missingComponent = screen.getByTestId("missing")
    expect(missingComponent).toBeInTheDocument()
  })

  it("should render 'Page Does Not Exist' text and 'Visit Our Website' link ", () => {
    buildApp()

    const errorText = screen.getByText("Page Does Not Exist")
    expect(errorText).toBeInTheDocument() 
    const taskTrackerLink = screen.getByText("Visit Our Website")
    expect(taskTrackerLink).toBeInTheDocument()
  })

  it("should navigate to website home page onclick 'Visit Our Website' ", () => {
    buildApp()

    const taskTrackerLink = screen.getByText("Visit Our Website")
    expect(taskTrackerLink).toBeInTheDocument()
    fireEvent.click(taskTrackerLink)
    expect(location.pathname).toBe("/")
  })

})