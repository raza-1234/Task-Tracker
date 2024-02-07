import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditTask from '../../components/EditTask';

const buildApp = (buttonText, getId) => {
  const renderApp = render(
    <BrowserRouter>
      <EditTask buttonText={buttonText} getId={getId}/>
    </BrowserRouter>
  )
  return renderApp;
}

describe("EditTask", () => {
  const mockClickHandler = jest.fn()

  it("should not render edit task form when button text is false", () => {
    buildApp(false, mockClickHandler)

    const editTask = screen.getByTestId("editTask")
    const taskForm = screen.queryByTestId("taskForm")
    
    expect(editTask).toBeInTheDocument()
    expect(taskForm).not.toBeInTheDocument()  
  })

  it("should render edit task form when button text is true", () => {
    buildApp(true, mockClickHandler)

    const taskForm = screen.getByTestId("taskForm")
    expect(taskForm).toBeInTheDocument() 
  })
})