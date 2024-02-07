import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../components/Footer';

const buildApp =() => {
  const renderApp = render(
    <BrowserRouter>
      <Footer/>
    </BrowserRouter>
  )
  return renderApp;
}

describe("Footer", () => {

  it("should render successfully", () => {
    buildApp()
    
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
  })

  it("should render footer text in paragraph", () => {
    buildApp()

    const footerText = screen.getByTestId("footer-text")
    expect(footerText).toBeInTheDocument()
    expect(footerText).toHaveTextContent("Copyright © 2023")
  })

  it("should render Link with text Task and navigate to task page", () => {
    buildApp()

    const footerLink = screen.getByText("Tasks")
    expect(footerLink).toBeInTheDocument()
    fireEvent.click(footerLink)
    expect(location.pathname).toBe("/Tasks")
  })

})
