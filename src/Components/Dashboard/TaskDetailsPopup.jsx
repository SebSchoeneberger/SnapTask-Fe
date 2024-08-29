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
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

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
    <dialog id="taskDetails" className="modal">
      {task && (
        <div className="modal-box max-w-[60rem]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{task.title}</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle  absolute right-2 top-2">✕</button>
            </form>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="pt-4">
                Status: <strong>{task.status}</strong>
              </p>
              {task.startedDate && (
                <p className="py-0">
                  Started: <strong>{formatDateFull(task.startedDate)}</strong>
                </p>
              )}
              {task.finishedDate && (
                <p className="py-0">
                  Finished: <strong>{formatDateFull(task.finishedDate)}</strong>
                </p>
              )}
            </div>
            <p className="py-4">
              Priority:<strong> {task.priority}</strong>
            </p>
          </div>

          <p className="py-12 font-semibold text-lg">{task.description}</p>
          <div ref={qrRef} className="flex items-center justify-center gap-12 pb-4 ">
            <QRCode value={`${API_URL}/tasks/${task._id}`} />
            <button className="btn btn-outline" onClick={downloadQRCode}>
              Download QR Code
            </button>
          </div>
          <div className="flex justify-between">
            <p>
              Created by:{" "}
              <strong>
                {task.creator.firstName} {task.creator.lastName}
              </strong>
            </p>
            <div className="text-sm">
              <p className="py-0">
                Created at: <strong>{formatDateFull(task.createdAt)}</strong>
              </p>
              <p className="py-0">
                Due Date: <strong>{formatDateFull(task.dueDate)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default TaskDetailsPopup;
