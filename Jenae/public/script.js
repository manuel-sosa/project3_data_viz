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
  
      // Calculate percentages for each column based on total_capacity
      const totalCapacity = data[0].total_capacity;
      const percentages = {
        DIS_ACUTE: (data[0].total_acute / totalCapacity) * 100,
        DIS_PSYCH: (data[0].total_psych / totalCapacity) * 100,
        DIS_CHEM: (data[0].total_chem / totalCapacity) * 100,
        DIS_REHAB: (data[0].total_rehab / totalCapacity) * 100,
        DIS_LTC: (data[0].total_ltc / totalCapacity) * 100,
        DIS_RESDNT: (data[0].total_resdnt / totalCapacity) * 100,
      };
  
      // Display query results in the result container
      let html = '<table>';
      html += '<thead><tr><th>Service</th><th>Percentage of Total Capacity</th></tr></thead>';
      html += '<tbody>';
      for (const [service, percentage] of Object.entries(percentages)) {
        html += `<tr><td>${service}</td><td>${percentage.toFixed(2)}%</td></tr>`;
      }
      html += '</tbody></table>';
      resultContainer.innerHTML = html;
  
      // Extract data and labels for pie chart
      const pieData = Object.values(percentages);
      const pieLabels = Object.keys(percentages);
  
      // Create pie chart
      chartContainer.innerHTML = '<div id="pieChart"></div>';
      Plotly.newPlot('pieChart', [{
        values: pieData,
        labels: pieLabels,
        type: 'pie'
      }], {
        title: 'Percentage of Total Capacity by Service'
      });
    });
  });
  