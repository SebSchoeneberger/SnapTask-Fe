import React, { useContext } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { ColorContext } from "../Context/ColorProvider";

// Register the required components with Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart() {
  const { colors } = useContext(ColorContext);

  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Tasks completed",
        data: [25, 59, 30, 71, 56, 25, 10],
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
