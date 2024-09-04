import { Link, useNavigate } from "react-router-dom";
import { formatDateFull, formatDateShort } from "../../Utils/DateUtils";
import { truncateText } from "../../Utils/SortTablesUtils";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className=" card bg-base-300 text-base-content border-[1px] border-base-content border-opacity-25  w-full mb-6 hover:cursor-pointer hover:bg-base-200 hover:border-opacity-50">
      <div className="card-body p-6 items-center text-center">
        <div className="w-full">
          <div className="flex flex-col w-full items-start gap-2 ">
            <div className="flex w-full mb-4">
              <p className="card-title mb-2 text-lg w-full">{truncateText(task.title, 80)}</p>
              <p
                className={`card-title text-center m-auto px-4 text-sm py-1 ${
                  task.status === "New"
                    ? "bg-info text-info-content"
                    : task.status == "Finished"
                    ? "bg-success text-success-content"
                    : "bg-warning text-warning-content"
                }`}>
                {task.status}
                {task.steps.length > 0 && (
                  <>
                    {" "}
                    ({task.steps.filter((x) => x.isCompleted == true).length}/{task.steps.length})
                  </>
                )}
              </p>
            </div>
            <div className="flex  w-full justify-between ">
              <p
                className={`card-title text-sm font-bold ${
                  task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-600" : "text-green-500"
                }`}>
                {task.priority} priority
              </p>
              <div className="flex flex-col  items-center ">
                {task.status == "Finished" ? (
                  <p className="card-title text-sm italic">
                    Date: <br /> {formatDateFull(task.finishedDate)}
                  </p>
                ) : (
                  <p className="card-title text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>{" "}
                    {formatDateShort(task.dueDate)}
                  </p>
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
