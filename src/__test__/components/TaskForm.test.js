import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import TaskForm from "../../components/TaskForm";
import { BrowserRouter } from 'react-router-dom';
import api from "../../axios/api" 
import { buildTaskPayload } from "../utils/helper"

jest.mock("../../axios/api", () => {
  return ({
    ...jest.requireActual(),
    post: jest.fn(),
    put: jest.fn()
  })
})

describe("TaskForm", () => {
  const mockClickHandler = jest.fn();
  const mockTask = buildTaskPayload(2) 

  const mockPostData = {
    checked: false,
    date: "2024-02-01",
    description: "some description",
    id: "3", 
    task: "sample 1",
    time: "05:47"
  }

  it("should render successfully", () => {
    const { container } = render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          setTaskId={mockClickHandler} 
          id={1} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    )

    const taskForm = screen.getByTestId("taskForm")
    expect(taskForm).toBeInTheDocument()

    expect(screen.getByLabelText("Task")).toBeInTheDocument()
    expect(screen.getByLabelText("Date")).toBeInTheDocument()
    expect(screen.getByLabelText("Time")).toBeInTheDocument()
    expect(screen.getByLabelText("Task Description")).toBeInTheDocument()
    expect(screen.getByLabelText("Set Reminder")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should render input fields", () => {
    render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          setTaskId={mockClickHandler} 
          id={1} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    )

    expect(screen.getByTestId("textInput")).toHaveAttribute("type", "text")
    expect(screen.getByTestId("dateInput")).toHaveAttribute("type", "date")
    expect(screen.getByTestId("timeInput")).toHaveAttribute("type", "time")
    expect(screen.getByTestId("descriptionInput")).toHaveAttribute("type", "text")
    expect(screen.getByTestId("reminderInput")).toHaveAttribute("type", "checkBox")
  })

  it("should render 'update task' button if there is an id", async () => {
    render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          setTaskId={mockClickHandler} 
          id={1} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    )

    const updateButton = screen.getByRole("button", {name:"Update Task"})
    expect(updateButton).toBeInTheDocument()
  })

  it("should render 'save task' button if no id exists.", async () => {
    render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          setTaskId={mockClickHandler} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    )

    const updateButton = screen.getByRole("button", {name:"Save Task"})
    expect(updateButton).toBeInTheDocument()
  })

  it("should post data and return that data", async () => {
    api.post.mockResolvedValue({data: mockPostData})

    let container;
    await act( async () => container = render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          setTaskId={mockClickHandler} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    ));

    const button = screen.getByRole("button", {name: "Save Task"})

    const task = screen.getByLabelText("Task");
    const date = screen.getByLabelText("Date")
    const time = screen.getByLabelText("Time")
    const description = screen.getByLabelText("Task Description")
    const reminder = screen.getByLabelText("Set Reminder")

      fireEvent.change(task, {target: {value: "sample 1"}})
      fireEvent.change(date, { target: { value: '2024-02-01' } });
      fireEvent.change(time, {target: {value: "05:47"}})
      fireEvent.change(description, {target: {value: "some description"}})
      fireEvent.change(reminder, {target: {value: false}})

    expect(screen.getByDisplayValue("sample 1")).toBeInTheDocument()
    fireEvent.click(button); 
    
    await waitFor(() => {
      expect(container.container).toMatchSnapshot();
      expect(api.post).toHaveBeenCalledWith("/tasks", mockPostData) 
    }) 
  });

  it("should update data and return that data", async () => {
    api.put.mockResolvedValue({data: mockPostData})

    let container;
    await act( async () => container = render(
      <BrowserRouter>
        <TaskForm 
          task = {mockTask} 
          taskId={1}
          setTask={mockClickHandler} 
          id={3}
          setTaskId={mockClickHandler} 
          fetchData={mockClickHandler}
        />
      </BrowserRouter>
    ));

    const button = screen.getByRole("button", {name: "Update Task"})

    const task = screen.getByLabelText("Task");
    const date = screen.getByLabelText("Date")
    const time = screen.getByLabelText("Time")
    const description = screen.getByLabelText("Task Description")
    const reminder = screen.getByLabelText("Set Reminder")

    fireEvent.change(task, {target: {value: "sample 1"}})
    fireEvent.change(date, { target: { value: '2024-02-01' } });
    fireEvent.change(time, {target: {value: "05:47"}})
    fireEvent.change(description, {target: {value: "some description"}}) 
    fireEvent.change(reminder, {target: {value: false}})
    fireEvent.click(button); 
    
    await waitFor(() => {
      expect(container.container).toMatchSnapshot();
      expect(api.put).toHaveBeenCalledWith("/tasks/3", mockPostData)  
    }) 
  }); 
 
}) 