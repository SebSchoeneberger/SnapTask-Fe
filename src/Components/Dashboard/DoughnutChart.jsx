import React, { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ColorContext } from "../../Context/ColorProvider";

// Register necessary components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ tasks }) => {
  if (!tasks) return;
  const { colors } = useContext(ColorContext);

  const chartsTasks = {
    Open: 0,
    Finished: 0,
    Overdue: 0,
  };

  // console.log(tasks);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].dueDate > new Date() || tasks[i].isOverdue) chartsTasks["Overdue"]++;
    else if (tasks[i].status === "New" || tasks[i].status === "In Progress") chartsTasks["Open"]++;
    else if (tasks[i].status === "Finished") chartsTasks["Finished"]++;
  }

  const data = {
    labels: Object.keys(chartsTasks),
    datasets: [
      {
        label: "Tasks",
        data: Object.values(chartsTasks),
        backgroundColor: [colors.accent, colors.success, colors.secondary],
        // hoverBackgroundColor: [colors.primary, colors.info, colors.accent],
        borderColor: [colors.accent, colors.success, colors.secondary],
        borderWidth: 1,
        hoverOffset: 2,
        // hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: colors.baseContent, // Fallback to Tailwind gray
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
