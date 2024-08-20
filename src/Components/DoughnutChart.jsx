import React, { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ColorContext } from "../Context/ColorProvider";

// Register necessary components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { colors } = useContext(ColorContext);

  const data = {
    labels: ["Completed", "In Progress", "Overdue"],
    datasets: [
      {
        label: "Tasks",
        data: [12, 17, 3],
        backgroundColor: [colors.primary, colors.info, colors.accent],
        // hoverBackgroundColor: [colors.primary, colors.info, colors.accent],
        borderColor: [colors.primary, colors.info, colors.accent],
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
