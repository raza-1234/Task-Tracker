import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Headers from "../../components/Headers"

const buildApp = (buttonText, formToggle) => {
  const renderApp = render(
    <BrowserRouter>
      <Headers buttonText={buttonText} formToggle={formToggle}/>
    </BrowserRouter>
  )
  return renderApp;
}

describe("Headers", () => {
  const mockClickHandler = jest.fn();

  it('should render successfully', () => {
    buildApp()

    const header = screen.getByTestId("headers")
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("headers");
  });

  it('should render heading', () => {
    buildApp(true, mockClickHandler)
  
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Task Tracker");
  });

  it('should render button with text "Open"', () => {
    buildApp(true, mockClickHandler)

    const button = screen.getByTestId("header-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Open");
  });

  it('should render button with text "Close"', () => {
    buildApp(false, mockClickHandler)

    const button = screen.getByTestId("header-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Close");
  });

  it('should call function onClick button', () => {
    buildApp(false, mockClickHandler)

    const button = screen.getByTestId("header-button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalled()
  });

  it('should render home page onClick link', async () => {
    buildApp(false, mockClickHandler)

    const headingLink = screen.getByText("Task Tracker");
    expect(headingLink).toBeInTheDocument();
    fireEvent.click(headingLink); 
    expect(location.pathname).toBe('/');
  });

})
