import { Link, useNavigate } from "react-router-dom";
import { formatDateFull, formatDateShort } from "../../Utils/DateUtils";
import { truncateText } from "../../Utils/SortTablesUtils";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className=" card bg-base-300 text-base-content border-[1px] border-base-content border-opacity-25  w-full m-auto hover:cursor-pointer hover:bg-base-200 hover:border-opacity-50">
      <div className="card-body items-center text-center">
        <div className="w-full">
          <div className="flex flex-col w-full items-center gap-2 ">
            <p className="card-title mb-2 text-lg">{truncateText(task.title, 80)}</p>
            <div className="flex  w-full justify-between ">
              <p
                className={`card-title text-sm font-semibold ${
                  task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"
                }`}>
                {task.priority} priority
              </p>
              <div className="flex flex-col  items-center ">
                <p
                  className={`card-title text-center m-auto px-4 text-sm py-1 ${
                    task.status === "New"
                      ? "bg-info text-info-content"
                      : task.status == "Finished"
                      ? "bg-success text-success-content"
                      : "bg-warning text-warning-content"
                  }`}>
                  {task.status}
                </p>
                {task.status == "Finished" ? (
                  <p className="card-title text-sm italic">
                    Date: <br /> {formatDateFull(task.finishedDate)}
                  </p>
                ) : (
                  <p className="card-title text-sm">Due Date: {formatDateShort(task.dueDate)}</p>
                )}
              </div>
            </div>
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
