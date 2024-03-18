// public/script.js
document.addEventListener('DOMContentLoaded', async () => {
  const hospitalSelect = document.getElementById('hospitalSelect');
  const submitBtn = document.getElementById('submitBtn');
  const resultContainer = document.getElementById('resultContainer');
  const chartContainer = document.getElementById('chartContainer');

  // Fetch list of hospital IDs and populate the dropdown
  const response = await fetch('/api/hospital_ids');
  const hospitalIds = await response.json();

  hospitalIds.forEach((hospital) => {
      const option = document.createElement('option');
      option.value = hospital.hospitalid;
      option.textContent = hospital.hospitalid;
      hospitalSelect.appendChild(option);
  });

  submitBtn.addEventListener('click', async () => {
      const selectedHospitalId = hospitalSelect.value;
      const response = await fetch(`/api/hospital_data/${selectedHospitalId}`);
      if (!response.ok) {
          console.error('Error fetching data:', response.statusText);
          return;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          return;
      }

      // Extract data and labels for bar chart
      const barData = Object.values(data[0]);
      const barLabels = ['Acute', 'Psychiatric', 'Chemical Dependency', 'Rehabilitation', 'Long-Term Care', 'Residential Services'];

      // Create bar chart
      chartContainer.innerHTML = '<div id="barChart"></div>';
      Plotly.newPlot('barChart', [{
          x: barLabels,
          y: barData,
          type: 'bar'
      }], {
          title: 'Type of Care Provided',
          xaxis: {
              title: 'Service'
          },
          yaxis: {
              title: 'Amount'
          }
      });
  });
});