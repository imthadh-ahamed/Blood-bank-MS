import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

function LineChart({ monthlyDonors }) {
  const chartRef = React.createRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyDonors.map((item) => item.month), // Extract month labels
        datasets: [
          {
            label: 'Monthly Donor Demand',
            data: monthlyDonors.map((item) => item.count), // Extract donor counts
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue background
            borderColor: 'rgba(54, 162, 235, 1)', // Blue border
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true, // Start y-axis at 0
              },
            },
          ],
        },
      },
    });
  }, [monthlyDonors]); // Update chart when monthlyDonors change

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}

export default LineChart;
