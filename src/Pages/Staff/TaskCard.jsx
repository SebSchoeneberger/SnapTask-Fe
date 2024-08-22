import { Link, useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className=" card bg-base-300 text-base-content border-[1px] border-base-content border-opacity-25  w-full m-auto hover:cursor-pointer hover:bg-base-200 hover:border-opacity-50">
      <div className="card-body items-center text-center">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full items-center">
            <h2 className="card-title">{task.title}</h2>
            <h2 className="card-title text-sm font-semibold">{task.priority} priority</h2>
          </div>
          <div className="flex flex-col w-full items-center">
            <h2
              className={`card-title text-center m-auto px-4 text-sm py-1 ${
                task.status === "New" ? "bg-primary text-primary-content" : "bg-warning text-warning-content"
              }`}>
              {task.status}
            </h2>
            <h2 className="card-title text-sm">{new Date(task.dueDate).toLocaleDateString()}</h2>
          </div>

          {/* <div className="card-actions justify-end w-full">
            <button className="btn btn-primary text-lg font-bold rounded-full">{">"}</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
