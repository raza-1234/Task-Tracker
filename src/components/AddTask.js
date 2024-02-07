import React from 'react'
import TaskForm from './TaskForm'
import Tasks from './Tasks'

const AddTask = ({buttonText , task , taskId , deleteHandler , setTaskId , setTask  , getId}) => {
  return (
     <div data-testid = "addTask">
     { buttonText &&
        <TaskForm
          task = {task}
          setTaskId = {setTaskId}
          taskId = {taskId}
          setTask = {setTask}
        />
      }

        <Tasks 
          task = {task.slice(-2)}
          deleteHandler = {deleteHandler}
          getId={getId}
        />
    </div>
  )
}

export default AddTask
