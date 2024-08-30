import QRCode from "qrcode.react";
import React, { useRef } from "react";
import { formatDateFull } from "../../Utils/DateUtils";

const TaskDetailsPopup = ({ task }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    // QR code is rendered as a <canvas> element inside the qrcode.react component
    const canvas = qrRef.current.querySelector("canvas");
    //The toDataURL() method of the canvas element converts the QR code into a data URL that represents the image in PNG format.
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    //A temporary <a> element is created to trigger the download. This element's href is set to the PNG data URL, and the download attribute specifies the filename.
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QRcode - ${task.area.name} - ${task.title}.png`;
    document.body.appendChild(downloadLink);
    //The link is programmatically clicked to initiate the download, and then removed from the DOM.
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <dialog id="taskDetails" className="modal modal-bottom sm:modal-middle">
      {task && (
        <div className="modal-box bg-base-200 p-6 my-8 rounded-2xl min-w-[700px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-left w-full max-w-xl">
              Task Details
            </h3>
            <form method="dialog">
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex">
            {/* Left Column: Task Name and Description */}
            <div className="w-3/5 pr-4">
              <p className="flex gap-1 mb-6">
                <strong>Task Name:</strong> {task.title}
              </p>
              <p className="flex flex-col items-start gap-1">
                <strong>Description:</strong>{" "}
                <span className="text-left">{task.description}</span>
              </p>
            </div>

            {/* Right Column: Task Details */}
            <div className="w-2/5 pl-4">
              <div className="flex flex-col items-start">
                <p className="mb-6">
                  <strong>Status:</strong> {task.status}
                </p>
                <p className="mb-6">
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p className="">
                  <strong>Created at:</strong> {formatDateFull(task.createdAt)}
                </p>
                <p className="">
                  <strong>Due Date:</strong> {formatDateFull(task.dueDate)}
                </p>
                {task.startedDate && (
                  <p className="">
                    <strong>Started:</strong> {formatDateFull(task.startedDate)}
                  </p>
                )}
                {task.finishedDate && (
                  <p className="mb-6">
                    <strong>Finished:</strong>
                    {formatDateFull(task.finishedDate)}
                  </p>
                )}
                <div className="flex flex-col items-start">
                  <p className="mb-6 flex gap-1">
                    <strong>Created by: </strong> {task.creator.firstName}{" "}
                    {task.creator.lastName}
                  </p>
                  {task.assignedTo.length > 0 && (
                    <p className="mb-6 flex flex-col gap-1">
                      <strong className="text-left">Assigned to:</strong>{" "}
                      {task.assignedTo.map((user) => (
                        <span className="flex" key={user._id}>
                          {user.firstName} {user.lastName}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div
                  ref={qrRef}
                  className="flex items-center justify-center gap-12 pb-4 mt-4"
                >
                  <QRCode hidden value={`${API_URL}/tasks/${task._id}`} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={downloadQRCode}>
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default TaskDetailsPopup;
