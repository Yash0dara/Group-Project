import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  const data = {
    labels: ['Running', 'Cycling', 'Swimming'],
    datasets: [
      {
        label: 'Activity Types',
        data: [30, 40, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container" style={{ height: '300px', marginBottom: '20px' }}>
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
        height={null}
      />
    </div>
  );
}

export default PieChart;
