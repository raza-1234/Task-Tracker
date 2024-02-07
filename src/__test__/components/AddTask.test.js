import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddTask from '../../components/AddTask';
import { buildTaskPayload } from '../utils/helper';

const buildApp = (task, buttonText) => {
  const renderApp = render(
    <BrowserRouter>
      <AddTask task={task} buttonText={buttonText}/>
    </BrowserRouter>
  )
  return renderApp;
}
 
describe("AddTask", () => {

  it("should render successfully", () => {
    const taskInfo = buildTaskPayload(3)
    buildApp(taskInfo, true)
    const addTask = screen.getByTestId("addTask") 
    expect(addTask).toBeInTheDocument()
  })

  it("should render form when 'buttontext is true'", () => {
    const taskInfo = buildTaskPayload(3) 
    buildApp(taskInfo, true)
    const taskForm = screen.queryByTestId("taskForm")
    const taskListHeading = screen.getAllByRole("heading")

    expect(taskForm).toBeInTheDocument()
    expect(taskListHeading[0]).toHaveTextContent("Fake title 2")
    expect(taskListHeading[1]).toHaveTextContent("Fake title 3")  
  })

  it("should not render form when 'buttontest is false'", () => {
    const taskInfo = buildTaskPayload(3) 
    buildApp(taskInfo, false)
    const taskForm = screen.queryByTestId("taskForm")
    const taskListHeading = screen.getAllByRole("heading")

    expect(taskForm).not.toBeInTheDocument();

    expect(taskListHeading[0]).toHaveTextContent("Fake title 2")
    expect(taskListHeading[1]).toHaveTextContent("Fake title 3")  
  })
})