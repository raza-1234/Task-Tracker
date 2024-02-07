import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TaskList from '../../components/TaskList';

describe("TaskList ", () => {

  const mockClickHandler = jest.fn()
  const mockTask = {
    id: '1',
    task: "play",
    checked: false,
    date: "2024-02-01",
    time: "05:47",
  }

  it("should render successfully", () => {
    render(
      <BrowserRouter>
        <TaskList/>
      </BrowserRouter>
    )
    const taskListDiv = screen.getByTestId("taskList")
    expect(taskListDiv).toBeInTheDocument()
  })

  it("should render heading", () => {
    render(
      <BrowserRouter>
        <TaskList/>
      </BrowserRouter>
    )
    const headingElement = screen.getByRole("heading")
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveClass("taskListHeading")
  })

  it("should render paragraph", () => {
    render(
      <BrowserRouter>
        <TaskList/>
      </BrowserRouter>
    )
    const taskTimeText = screen.getByTestId("taskTime")
    expect(taskTimeText).toBeInTheDocument()
  })

  it("should render trash icon", () => {
    render(
      <BrowserRouter>
        <TaskList/>
      </BrowserRouter>
    )

    const deleteTaskIcon = screen.getByTestId("deleteTask")
    expect(deleteTaskIcon).toBeInTheDocument()
  })
  
  it("should call function onClick trash icon", () => {
    render(
      <BrowserRouter>
        <TaskList deleteHandler={mockClickHandler}/>
      </BrowserRouter>
    )

    const deleteTaskIcon = screen.getByTestId("deleteTask")
    expect(deleteTaskIcon).toBeInTheDocument()
    fireEvent.click(deleteTaskIcon)
    expect(mockClickHandler).toHaveBeenCalled()
  })

  it("should render edit task pen-icon", () => {
    render(
      <BrowserRouter>
        <TaskList/>
      </BrowserRouter>
    )

    const editTaskIcon = screen.getByTestId("editTask")
    expect(editTaskIcon).toBeInTheDocument()
  })

  it("should call function onClick pen icon and navigate to edity btask page", () => {
    render(
      <BrowserRouter>
        <TaskList task={mockTask} getId={mockClickHandler}/>
      </BrowserRouter>
    )

    const editTaskIcon = screen.getByTestId("editTask")
    expect(editTaskIcon).toBeInTheDocument()
    fireEvent.click(editTaskIcon)
    expect(mockClickHandler).toHaveBeenCalled()
    expect(location.pathname).toBe("/Edit/1")
  })

  it("should render the same task properties passed in prop", () => {

    render(
      <BrowserRouter>
        <TaskList task={mockTask}/>
      </BrowserRouter>
    )

    const taskName = screen.getByRole("heading")
    const taskTime = screen.getByTestId("taskTime")

    expect(taskName).toBeInTheDocument()
    expect(taskTime).toBeInTheDocument()

    expect(taskName).toHaveTextContent(/play/i)
    expect(taskTime).toHaveTextContent("1st February, 2024 at 05:47")
  })

  it("should render 'taskListDivChecked' class when checked value is true", () => {

    const Task = {
      id: '1',
      task: "play",
      checked: true,
      date: "2024-02-01",
      time: "05:47",
    }
  
    render(
      <BrowserRouter>
        <TaskList task={Task}/>
      </BrowserRouter>
    )

    const taskListDiv = screen.getByTestId("taskList")
    expect(taskListDiv).toBeInTheDocument()
    expect(taskListDiv).toHaveClass("taskListDivChecked")
  })

  it("should render 'taskListDiv' class when checked value is false", () => {
    render(
      <BrowserRouter>
        <TaskList task={mockTask}/>
      </BrowserRouter>
    )

    const taskListDiv = screen.getByTestId("taskList")
    expect(taskListDiv).toBeInTheDocument()
    expect(taskListDiv).toHaveClass("taskListDiv")
  })

  it("should navigate to task detail page onclick task heading/date", () => {

    render(
      <BrowserRouter>
        <TaskList task={mockTask}/>
      </BrowserRouter>
    )

    const taskInfo = screen.getByTestId("taskInfo")
    expect(taskInfo).toBeInTheDocument()
    fireEvent.click(taskInfo)
    expect(location.pathname).toBe("/Tasks/1")
  })

})
