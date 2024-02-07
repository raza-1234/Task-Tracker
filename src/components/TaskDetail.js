import React, { useEffect, useState } from 'react'
import {FaArrowCircleLeft} from "react-icons/fa"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const TaskDetail = ({task, fetchData}) => {

  const [duration , setDuration] = useState("");
  const [currentTask , setCurrentTask] = useState();
  const {id} = useParams();
  const navigate = useNavigate(null);

  function calculateTimeRemaining(currentTask) {
    if(!currentTask) {
      setDuration('Task not found');
      return;
    }

    const taskDateTime = moment(`${currentTask.date} ${currentTask.time}`, 'YYYY-MM-DD HH:mm');
    const now = moment();

    if(taskDateTime.isSameOrBefore(now)) {
      setDuration('Task Already Passed');
    } 
    else {
      const timeDiff = taskDateTime.diff(now);
      const minutesRemaining = moment.duration(timeDiff).asMinutes();

      if(minutesRemaining < 60) {
        setDuration(`${minutesRemaining} Minutes Remaining`);
      } 
      else if(minutesRemaining < 1440) {
        const hoursRemaining = Math.floor(minutesRemaining / 60);
        setDuration(`${hoursRemaining} Hours Remaining`);
      } 
      else {
        const daysRemaining = Math.floor(minutesRemaining / 1440);
        const hoursRemaining = Math.floor((minutesRemaining % 1440) / 60);
        setDuration(`${(daysRemaining * 24) + hoursRemaining} Hours Remaining`);
      }
    }
  }

  useEffect(() => {
    if (!task.length){
      fetchData();
    }else{
      setCurrentTask(task?.find(task => task.id.toString() === id))
      const currentTask = task?.find(task => task.id.toString() === id)
      calculateTimeRemaining(currentTask);
    }
  }, [task]);

  return (
    <div data-testid="taskDetail">
      {currentTask && 
        <div data-testid="taskDetailList" className={currentTask?.checked ? "taskListDivChecked" : "taskListDiv"}>
          <div>
            <h2 data-testid="taskHeading" className='taskListHeading'> {`${currentTask?.task?.charAt(0).toUpperCase()}${currentTask?.task.slice(1).toLowerCase()} `} </h2>
            <p><b>{`${moment(currentTask?.date).format("Do MMMM, YYYY")} at ${currentTask?.time}`}</b></p>
            <p><b>{currentTask?.description}</b></p>
            <h4>Time Left : {duration} </h4>
          </div>

          <div className='listButton'>
            <FaArrowCircleLeft data-testid="backArrow" className='backButton' onClick={() => navigate(-1)}/>
          </div>
        </div>
      } 
    </div>
  )
}

export default TaskDetail 
