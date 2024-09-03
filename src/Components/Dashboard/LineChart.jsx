import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { ColorContext } from "../../Context/ColorProvider";
import { formatDateShort } from "../../Utils/DateUtils";

// Register the required components with Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart({ tasks }) {
  // if (!tasks) return;
  const { colors } = useContext(ColorContext);

  // tasks = {
  //   "15.08.2024": 25,
  //   "16.08.2024": 59,
  //   "17.08.2024": 30,
  //   "18.08.2024": 71,
  //   "19.08.2024": 56,
  //   "20.08.2024": 25,
  //   "21.08.2024": 10,
  // };

  function getChartsData(_tasks, status) {
    const chartTasks = {};

    for (let i = 6; i > 0; i--) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      let dateStr = formatDateShort(date); //.toLocaleDateString();
      if (!chartTasks[dateStr]) {
        let done = [];
        if (status == "all") done = _tasks.filter((x) => formatDateShort(x.createdAt) == dateStr);
        else done = _tasks.filter((x) => formatDateShort(x.finishedDate) == dateStr);
        chartTasks[dateStr] = done.length;
      }
    }
    let dateToday = [];

    dateToday = formatDateShort(new Date()); //.toLocaleDateString();
    if (status == "all") chartTasks[dateToday] = _tasks.filter((x) => formatDateShort(x.createdAt) == dateToday).length;
    else chartTasks[dateToday] = _tasks.filter((x) => formatDateShort(x.finishedDate) == dateToday).length;

    return chartTasks;
  }

  const allTasks = getChartsData(tasks, "all");
  const finishedTasks = getChartsData(
    tasks.filter((x) => x.status == "Finished"),
    "finished"
  );

  const data = {
    labels: Object.keys(allTasks),
    datasets: [
      {
        label: "All Tasks",
        data: Object.values(allTasks),
        fill: true,
        backgroundColor: colors.secondary,
        hoverBackgroundColor: colors.primary,
        // pointBackgroundColor: colors.accent,
        pointBorderColor: colors.neutral,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderColor: colors.secondary,
        tension: 0.1,
      },
      {
        label: "Finished Tasks",
        data: Object.values(finishedTasks),
        fill: true,
        backgroundColor: colors.accent,
        hoverBackgroundColor: colors.accent,
        // pointBackgroundColor: colors.accent,
        pointBorderColor: colors.accent,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderColor: colors.accent,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: colors.baseContent, // Color for X-axis labels
        },
        grid: {
          // color: colors.neutral, // Color for grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: colors.baseContent, // Color for X-axis labels
          stepSize: 1,
        },
        grid: {
          // color: colors.neutral, // Color for grid lines
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: colors.baseContent, // Fallback to Tailwind gray
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
