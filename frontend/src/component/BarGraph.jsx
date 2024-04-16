import React from 'react';
import { Bar } from 'react-chartjs-2';

function Barchart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Workout Hours',
        data: [2, 1, 3, 2.5, 3.5, 2, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container" style={{ height: '300px', marginBottom: '20px' }}>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        height={null}
      />
    </div>
  );
}

export default Barchart;
