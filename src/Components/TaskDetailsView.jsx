import QRCode from "qrcode.react";
import { useEffect } from "react";

const TaskDetailsView = ({ task, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Open the dialog when the task is provided
    const dialog = document.getElementById("taskDetails");
    if (task) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [task]);

  return (
    <dialog id="taskDetails" className="modal">
      {task && (
        <div className="modal-box max-w-[40rem]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{task.title}</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex justify-between">
            <p className="py-4">
              Status: <strong>{task.status}</strong>
            </p>
            <p className="py-4">
              Priority: <strong>{task.priority}</strong>
            </p>
          </div>

          <p className="py-12 font-semibold text-lg">{task.description}</p>
          {task._id && (
            <div className="flex items-center justify-center">
              <QRCode value={`${API_URL}/tasks/${task._id}`} />
            </div>
          )}
          <div className="flex justify-between">
            <p>
              Created by:{" "}
              <strong>
                {task.creator.firstName} {task.creator.lastName}
              </strong>
            </p>
            <div className="text-sm">
              <p className="py-0">
                Created at:{" "}
                <strong>{new Date(task.createdAt).toLocaleString()}</strong>
              </p>
              <p className="py-0">
                Due date:{" "}
                <strong>{new Date(task.dueDate).toLocaleString()}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default TaskDetailsView;
