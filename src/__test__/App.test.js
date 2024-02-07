import React from 'react';
import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import api from "../axios/api"
import App from '../App';
import { buildTaskPayload } from './utils/helper';

jest.mock('../axios/api', () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

const buildApp = () => {
  const renderApp = render (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
  return renderApp;
}

describe('App Component', () => {
  const mockTaskData = buildTaskPayload(3);

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should fetches data and displays tasks', async () => {
    api.get.mockResolvedValueOnce({ data: mockTaskData });

    await act( async () => render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      ));

    const Sample2 = screen.getByText("Fake title 2");
    const Sample3 = screen.getByText("Fake title 3");

    expect(Sample2).toBeInTheDocument()
    expect(Sample3).toBeInTheDocument()
    expect(api.get).toHaveBeenCalledWith("/tasks")
  });

  test('should delete a task if user click on delete button.', async () => {
    api.get.mockResolvedValueOnce({ data: mockTaskData });
    api.delete.mockResolvedValue()

    await act( async () => render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      ));

    // const {queryAllByTestId} = render(
    //   <BrowserRouter>
    //     <App/>
    //   </BrowserRouter>
    // )

    const deleteIcon = await screen.findAllByTestId("deleteTask");

    await waitFor(() => {
      fireEvent.click(deleteIcon[0])
    })

    // expect(api.delete).toHaveBeenCalledWith("/tasks/2");
    // expect(screen.queryByText("Sample 2")).toBeNull()

    
    // await waitFor(() => {
    //   expect(api.delete).toHaveBeenCalledWith("/tasks/2");
    //   expect(screen.queryByText("Sample 2")).toBeNull()
    // })
  });

  test('toggles form on button click', async () => {
    api.get.mockResolvedValueOnce({ data: [] });
    await act( async () => render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    ));
   
    const formOpen = screen.getByRole("button", {name: "Open"})
    expect(formOpen).toBeInTheDocument()
    
    fireEvent.click(formOpen)

    const formClose = screen.getByRole("button", {name: "Close"})
    expect(formClose).toBeInTheDocument()
  }); 

});
