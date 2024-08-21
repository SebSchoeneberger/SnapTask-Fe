import React from 'react'; 
import { useState } from 'react';
import CreateTask from '../Components/CreateTask';


const Tasks = () => {
  
const [isOpen, setIsOpen] = useState (false)
const onClose = () => {setIsOpen (false)}
  

 


  return (
    <div className="p-8 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <button 
        onClick={() => { setIsOpen(true); }} 
        className="btn btn-outline btn-primary mt-4">
        Create New Task
      </button>
      <CreateTask isOpen={isOpen} onClose={onClose}/>
    </div>
  );
}
       
 

export default Tasks;