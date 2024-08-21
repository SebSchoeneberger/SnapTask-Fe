import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { ColorContext } from "../Context/ColorProvider";

// Register the required components with Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart({ tasksPerDay }) {
  const { colors } = useContext(ColorContext);
  tasksPerDay = {
    "15.08.2024": 25,
    "16.08.2024": 59,
    "17.08.2024": 30,
    "18.08.2024": 71,
    "19.08.2024": 56,
    "20.08.2024": 25,
    "21.08.2024": 10,
  };

  const data = {
    labels: Object.keys(tasksPerDay),
    datasets: [
      {
        label: "Completed tasks",
        data: Object.values(tasksPerDay),
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
      // {
      //   label: "Overdue Tasks",
      //   data: [15, 9, 10, 1, 6, 5, 0],
      //   fill: true,
      //   backgroundColor: colors.accent,
      //   hoverBackgroundColor: colors.accent,
      //   // pointBackgroundColor: colors.accent,
      //   pointBorderColor: colors.accent,
      //   pointRadius: 5,
      //   pointHoverRadius: 8,
      //   borderColor: colors.accent,
      //   tension: 0.1,
      // },
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
        beginAtZero: false,
        ticks: {
          color: colors.baseContent, // Color for X-axis labels
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
