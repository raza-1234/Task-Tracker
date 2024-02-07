import React from 'react'
import TaskList from './TaskList'

const Tasks = ({task , deleteHandler , getId}) => {
 
  return (
    <div data-testid="taskListWrapper">
      {task.map((task) => {
        return(
           <TaskList 
            key = {task.id}
            task = {task}
            deleteHandler = {deleteHandler}
            getId = {getId}
           />
          )
      })}
    </div>
  )
}

export default Tasks
