import React from "react";
import {useState , useEffect} from 'react';
import './App.css';
import Headers from './components/Headers';
import { Routes , Route  } from "react-router-dom"
import Missing from "./components/Missing";
import Tasks from "./components/Tasks";
import api from "./axios/api";
import Footer from "./components/Footer";
import TaskDetail from "./components/TaskDetail";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

function App() {
  const [task , setTask] = useState([]);    //state for display list of tasks
  const [buttonText , setButtonText] = useState(true);    //button value state for header button open form close form
  const [taskId , setTaskId] = useState(null);   //get task id for editing purpose
 
  //fetching data from json server using axios
  async function fetchData(){
    const response = await api.get("/tasks");
    setTask(response.data)
  }

  useEffect(() => {
    fetchData()
  },[])

  //function for delete the task from task list
  async function deleteHandler(id){
    const filteredArray = task.filter((task) => {
      return (task.id !== id)
    })

    try{
      await api.delete(`/tasks/${id}`)
      console.log('hello 12');
      setTask(filteredArray)
    }
    catch(err){
      console.log(err);
    }  
  }

  //function to disable or able the form on click action
  function formToggle(){
    setButtonText(!buttonText);
  }

  //function to get id of task
  function getTaskId(currentTaskId){
    setTaskId(currentTaskId)
  }

  return (
    <div data-testid="app" className="App">
      <main className='mainbody'>

        <Headers
          buttonText = {buttonText}
          formToggle = {formToggle}
        />

        <Routes>

          <Route path="/" element = {
            <AddTask
              buttonText={buttonText}
              task = {task}
              taskId={taskId}
              deleteHandler = {deleteHandler}
              setTaskId = {setTaskId}
              setTask = {setTask}
              getId = {getTaskId}/>
            }
          />

          <Route path="/Edit/:id" element = {<EditTask
            buttonText={buttonText}
            task = {task}
            taskId={taskId}
            setTask = {setTask}
            setTaskId = {setTaskId}
            fetchData = {fetchData}
            getId = {getTaskId}/>}
          />

          <Route path = "/Tasks" element = {<Tasks 
            task = {task}
            deleteHandler = {deleteHandler}
            getId = {getTaskId}/>}
          />

          <Route path = "/Tasks/:id" element = {<TaskDetail 
            task = {task}
            fetchData = {fetchData}/>
          }
          />
          <Route path="*" element = {<Missing/>}/>

        </Routes>
        <Footer/>

      </main>
    </div>
  );
}

export default App;
