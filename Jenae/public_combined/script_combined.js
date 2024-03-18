document.addEventListener('DOMContentLoaded', async () => {
  const hospitalSelect = document.getElementById('hospitalSelect');
  const submitBtn = document.getElementById('submitBtn');
  const resultContainer = document.getElementById('resultContainer');
  const pieChartContainer = document.getElementById('pieChartContainer');
  const barChartContainer = document.getElementById('barChartContainer');

  // Fetch list of hospital IDs and populate the dropdown
  const response = await fetch('/api/hospital_names');
  const hospitalNames = await response.json();

  hospitalNames.forEach((hospital) => {
      const option = document.createElement('option');
      option.value = hospital.hospitalname;
      option.textContent = hospital.hospitalname;
      hospitalSelect.appendChild(option);
  });

  submitBtn.addEventListener('click', async () => {
    const selectedHospitalName = hospitalSelect.value;
    const response = await fetch(`/api/hospital_data_pie/${selectedHospitalName}`);
    if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
      return;
    }
    try {
      const data = await response.json(); // Parse response as JSON
      if (!data || typeof data !== 'object') {
        console.error('Invalid data format:', data);
        return;
      }
    
      // Calculate percentages for each column based on total paid
      const totalPaid = data.total_paid;
      const percentages = {
        total_trad: (data.total_trad / totalPaid) * 100,
        total_medi_mang: (data.total_medi_mang / totalPaid) * 100,
        total_medi_cal_trad: (data.total_medi_cal_trad / totalPaid) * 100,
        total_medi_cal_mang: (data.total_medi_cal_mang / totalPaid) * 100,
        total_county_indi_trad_mang: (data.total_county_indi_trad_mang / totalPaid) * 100,
        total_other_trad: (data.total_other_trad / totalPaid) * 100,
        total_other_mang: (data.total_other_mang / totalPaid) * 100,
        total_other_indi: (data.total_other_indi / totalPaid) * 100,
        total_other_pay: (data.total_other_pay / totalPaid) * 100,
      };
      
    // Extract data and labels for pie chart
    const pieData = Object.values(percentages);
    const pieLabels = [
      'Medicare-Traditional',
      'Medicare-Managed',
      'Medi-Cal-Traditional',
      'Medi-Cal-Managed',
      'County Indigent Programs-Traditional & Managed',
      'Other Third Parties-Traditional',
      'Other Third Parties-Managed Care',
      'Other Indigent',
      'Other Payers'
    ];

    // Create pie chart
    pieChartContainer.innerHTML = '<div id="pieChart"></div>';
    Plotly.newPlot('pieChart', [{
      values: pieData,
      labels: pieLabels,
      type: 'pie'
    }], {
      title: 'Pay Mix by Hospital'
    });

  } catch (error) {
    console.error('Error processing data:', error);
  }

  // Fetch and process bar chart data
  try {
    const barResponse = await fetch(`/api/hospital_data_bar/${selectedHospitalName}`);
    if (!barResponse.ok) {
      console.error('Error fetching bar chart data:', barResponse.statusText);
      return;
    }
    const barChartData = await barResponse.json();

    if (!barChartData || typeof barChartData !== 'object' || barChartData.length === 0) {
      console.error('Invalid bar chart data format or empty data:', barChartData);
      return;
    }

    // Extract data for bar chart
    const barData = Object.values(barChartData[0]);
    const barLabels = ['Acute', 'Psychiatric', 'Chemical Dependency', 'Rehabilitation', 'Long-Term Care', 'Residential Services'];

    // Create bar chart
    barChartContainer.innerHTML = '<div id="barChart"></div>';
    Plotly.newPlot('barChart', [{
      x: barLabels,
      y: barData,
      type: 'bar'
    }], {
      title: 'Type of Care Provided',
      xaxis: {
        title: 'Care Type'
      },
      yaxis: {
        title: 'Number of Patients Discharged'
      }
    });
  } catch (error) {
    console.error('Error processing bar chart data:', error);
  }
  });
});