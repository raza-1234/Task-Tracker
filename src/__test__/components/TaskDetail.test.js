import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { buildTaskPayload } from "../utils/helper"
import TaskDetail from '../../components/TaskDetail';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockNavigate
}));

const buildTaskDetailsComponent = (task) => {
  const renderTaskDetail = render( 
    <BrowserRouter>
      <TaskDetail task={task}/>
    </BrowserRouter>
  )
  return renderTaskDetail
}

describe("TaskDetail", () => {

  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
  })
 
  it('should render successfully', () => {
    const tasks = buildTaskPayload(2)
    buildTaskDetailsComponent(tasks)

    expect(screen.getByTestId("taskDetail")).toBeInTheDocument()
  });

  it('should render task detail successfully', () => {
    const tasks = buildTaskPayload(2)
    buildTaskDetailsComponent(tasks)

    expect(screen.getByText("Fake title 1")) 
    expect(screen.getByText("Fake Description 1"))
    expect(screen.getByText("1st February, 2024 at 05:01"))
  });

  it('should render taskDetailList with class "taskListDiv" if task.checked is false', () => {
    const tasks = buildTaskPayload(2)
    buildTaskDetailsComponent(tasks)

    expect(screen.getByTestId("taskDetailList")).toHaveClass("taskListDiv")
  });

  it('should render taskDetailList with class "taskListDiv" if task.checked is false', () => {
    const tasks = [
      {
        checked: true, 
        date: `2024-02-08`,
        description: `Fake Description`,
        id: "1",
        task: `Fake Title`,
        time: `05:03`
      }
    ]  
    buildTaskDetailsComponent(tasks)

    expect(screen.getByTestId("taskDetailList")).toHaveClass("taskListDivChecked") 
  });

  it('should render "back arrow" icon and navigate to previous page onclick icon', () => {
    const tasks = buildTaskPayload(2)
    buildTaskDetailsComponent(tasks)

    const arrowIcon = screen.getByTestId("backArrow") 
    expect(arrowIcon).toBeInTheDocument()
    fireEvent.click(arrowIcon) 
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
