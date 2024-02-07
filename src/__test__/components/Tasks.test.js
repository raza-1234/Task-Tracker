import { render, screen } from '@testing-library/react';
import Tasks from "../../components/Tasks"
import { BrowserRouter } from 'react-router-dom';
import { buildTaskPayload } from '../utils/helper';

describe("Tasks", () => {
  const mockClickHandler = jest.fn()
  const task = buildTaskPayload(2)

  it("should render successfully", () => {
    render(
      <BrowserRouter>
        <Tasks task={task} deleteHandler={mockClickHandler} getId={mockClickHandler}/>)
      </BrowserRouter>
    )
    const taskList = screen.getByTestId("taskListWrapper")
    expect(taskList).toBeInTheDocument() 
  })

  it("should render all task", () => {
    render(
      <BrowserRouter>
        <Tasks task={task} deleteHandler={mockClickHandler} getId={mockClickHandler}/>
      </BrowserRouter>
    )
    const taskHeading = screen.getAllByRole("heading")

    expect(taskHeading[0]).toHaveTextContent("Fake title 1")
    expect(taskHeading[1]).toHaveTextContent("Fake title 2")
  })

})