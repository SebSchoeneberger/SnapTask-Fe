import React from 'react';
import TasksList from '../Components/TasksList'; 

const Tasks = () => {
    return (
        <div className="p-8 w-full flex flex-col items-center">
            <TasksList />
        </div>
    );
};

export default Tasks;