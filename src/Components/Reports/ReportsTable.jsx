import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { formatDateShort } from "../../Utils/DateUtils";
import { getToken } from "../../Utils/TokenUtils";
import html2canvasPro from "html2canvas-pro";
import jsPDF from "jspdf";
import logo from "../../assets/Logo.png";
import TaskDetailsPopup from "../Dashboard/TaskDetailsPopup";

const API_URL = import.meta.env.VITE_API_URL;

function ReportsTable({
  selectedArea,
  taskName,
  status,
  priority,
  startDate,
  endDate,
  dueDate,
  isDelayed,
  createdBy,
}) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasksUrl = `${API_URL}/tasks`;
  const token = getToken();

  useEffect(() => {
    axios
      .get(tasksUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  // Apply filtering logic
  const filteredTasks = tasks.filter((task) => {
    const matchesArea =
      selectedArea === "All" || task.area._id === selectedArea;
    const matchesTaskName =
      !taskName || task.title.toLowerCase().includes(taskName.toLowerCase());
    const matchesStatus = status === "Status" || task.status === status;
    const matchesPriority = !priority || task.priority === priority;
    const matchesStartDate =
      !startDate || new Date(task.dueDate) >= new Date(startDate);
    const matchesEndDate =
      !endDate || new Date(task.dueDate) <= new Date(endDate);
    const matchesDueDate =
      !dueDate ||
      new Date(task.dueDate).toDateString() ===
        new Date(dueDate).toDateString();
    const matchesIsDelayed =
      !isDelayed ||
      (new Date(task.dueDate) < new Date() && task.status !== "Finished");
    const matchesCreatedBy =
      createdBy === "All" ||
      `${task.creator.firstName.toLowerCase()} ${task.creator.lastName.toLowerCase()}` ===
        createdBy.toLowerCase();

    return (
      matchesArea &&
      matchesTaskName &&
      matchesStatus &&
      matchesPriority &&
      matchesStartDate &&
      matchesEndDate &&
      matchesDueDate &&
      matchesIsDelayed &&
      matchesCreatedBy
    );
  });

  const generatePDF = () => {
    html2canvasPro(document.getElementById("table-container")).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Add logo
        pdf.addImage(logo, "PNG", 10, 10, 20, 20);
        pdf.setFontSize(16);
        pdf.text("SnapTask", 10 + 20 + 5, 21);

        // Add title
        pdf.setFontSize(20);
        pdf.text("Task Reports", 105, 30, { align: "center" });

        // Add table image from canvas
        pdf.addImage(imgData, "PNG", 10, 40, 190, 0);

        const today = new Date();
        const formatedDay = formatDateShort(today);

        // Save the PDF
        pdf.save(`Tasks-report-${formatedDay}.pdf`);
      }
    );
  };

  if (isLoading)
    return (
      <div className="min-h-screen w-full m-auto text-left px-12 mb-8">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-6 mt-10 p-5">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Task Records</p>
          <button className="btn btn-primary" onClick={generatePDF}>
            Download Report
          </button>
        </div>

        <div className="overflow-x-auto" id="table-container">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Area</th>
                <th>Created By</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Delayed</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover hover:cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task);
                      document.getElementById("taskDetails").showModal();
                    }}
                  >
                    <td>{task.area.name}</td>
                    <td>{`${task.creator.firstName} ${task.creator.lastName}`}</td>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.priority}</td>
                    <td>{formatDateShort(task.dueDate)}</td>
                    <td>
                      {new Date(task.dueDate) < new Date() ? "Yes" : "No"}
                    </td>
                    <td>{formatDateShort(task.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <TaskDetailsPopup task={selectedTask} />
    </>
  );
}

export default ReportsTable;
