import React from 'react'
import { useState , useEffect} from 'react'
import api from '../axios/api';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({task, taskId, setTask, setTaskId, id, fetchData}) => {
    //state for managing inputs
    const [newTask , setNewTask] = useState("");
    const [date , setDate] = useState("");
    const [time , setTime] = useState("");
    const [description , setDescription] = useState("");
    const [reminder , setReminder] = useState(false)
    const [currentTask , setCurrentTask] = useState();

    const navigate = useNavigate(); //navigate

    function getData(){
        if(task.length === 0){
            fetchData();
        } else {
            setCurrentTask(task.find(item => item.id.toString() === id))
        }
    }

    useEffect(() => {
        if(id) {
            getData();
            if(currentTask) {
                setNewTask(currentTask.task);
                setDate(currentTask.date);
                setTime(currentTask.time);
                setDescription(currentTask.description)
                setReminder(currentTask.checked);
            }
        }
    },[currentTask, task])

    async function submitHandler(event){
        event.preventDefault();

        if(newTask.trim() === "" || date.trim() === ""  || time.trim() === "" || description.trim() === "") {
          return false
        }
        try {
            const newTaskList = {id: id, task: newTask , checked : reminder , date: date , time : time , description : description };
            
            if(!id) {
                id =  task.length ? Number(task[(task.length) - 1].id) + 1 : 1;
                if(!newTaskList.id) {
                    newTaskList.id = id.toString();
                }
                const response = await api.post("/tasks" , newTaskList)
                setTask([...task , response.data])
            } else {
                const response = await api.put(`/tasks/${id}` , {...newTaskList, id: id.toString()})
                setTask(task.map((task) => {
                    return (task.id === id.toString() ? response.data : task)
                }))
                navigate("/")
            }
        } catch(err) {
            console.log(err);
        }
        setNewTask("");
        setDate("")
        setTime("")
        setDescription("")
        setReminder(false);
        setTaskId(null)
    }

  return (
    <form data-testid="taskForm" className='taskForm'  onSubmit={submitHandler}>
        <label htmlFor='task'>Task</label>
        <input
            data-testid="textInput"
            required
            type='text'
            id='task'
            placeholder='Add Task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
        />

        <label htmlFor='date'>Date</label>
        <input
            data-testid="dateInput"
            required
            type='date'
            id='date'
            placeholder='Set Date'
            value={date}
            onChange = {(e) => setDate(e.target.value)}
        />

        <label htmlFor='time'>Time</label>
        <input
            data-testid="timeInput"
            required
            type='time'
            id='time'
            placeholder='Set Time'
            value={time}
            onChange = {(e) => setTime(e.target.value)}
        />

        <label htmlFor='description'>Task Description</label>
        <textarea
            type="text"
            data-testid="descriptionInput"
            required
            id='description'
            placeholder='Task Description ...'
            value={description}
            onChange = {(e) => setDescription(e.target.value)}
            rows="6"
            cols="60"/>

        <label htmlFor='Reminder Check'>Set Reminder</label>
        <input
            data-testid="reminderInput"
            className='checkBoxInput'
            id='Reminder Check'
            type='checkBox'
            checked= {reminder}
            onChange={(e) => setReminder(!reminder)}
        />

        <button className='saveTaskButton'>{id ? 'Update Task': 'Save Task'}</button>
      </form>
  )
}

export default TaskForm
