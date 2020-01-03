document.addEventListener('DOMContentLoaded', () => {
const ctx = document.getElementById('myChart').getContext('2d');
const chartData = []

  Axios({
      method:'get',
      url: 'api/checkout/',
  }).then(response=> {
      chartData = respnonse.data
  })
  // Sample data

  // Parse the dates to JS
  chartData.forEach((d) => {
    d.x = new Date(d.created_on);
  });

  // Render the chart
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [
        {
          label: 'new subscribers',
          data: chartData,
          backgroundColor: 'rgba(220,20,20,0.5)',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'MMM D',
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
});