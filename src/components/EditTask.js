import React, { Fragment } from 'react'
import TaskForm from './TaskForm'
import { useParams } from 'react-router-dom'

const EditTask = ({buttonText, task, taskId, setTask, setTaskId , fetchData , getId}) => {
    
  const {id} = useParams();
  getId(Number(id))

  return (
    <div data-testid="editTask">
      {
        buttonText &&
        <TaskForm
          buttonText = {buttonText}
          task = {task}
          taskId = {taskId}
          setTask={setTask}
          setTaskId = {setTaskId}
          id = {id}
          fetchData = {fetchData}
        />
      }
    </div>
  )
}

export default EditTask
