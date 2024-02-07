import React from 'react'
import {Link} from 'react-router-dom'
import {FaTrashAlt , FaPenAlt} from "react-icons/fa"
import moment from 'moment'

const TaskList = ({task={}, deleteHandler, getId}) => {
  return (
    <div data-testid="taskList" className={task.checked ? "taskListDivChecked" : "taskListDiv"} >
    <Link to= {`/Tasks/${task?.id}`}>
      <div data-testid = "taskInfo">
        <h2 className='taskListHeading'> {`${task?.task?.charAt(0).toUpperCase()}${task?.task?.slice(1).toLowerCase()}`}</h2>
        <p data-testid="taskTime"><b>{`${moment(task.date).format("Do MMMM, YYYY")} at ${task?.time}`}</b></p>
      </div>
    </Link>

    <div className='listButton'>
      <FaTrashAlt data-testid="deleteTask" className='deleteButton' onClick={() => deleteHandler(task?.id)}/>
      <Link to = {`/Edit/${task.id}`} >
        <FaPenAlt data-testid="editTask" onClick={() => getId(task.id)}/>
      </Link></div>
    </div>
  )
}

export default TaskList
