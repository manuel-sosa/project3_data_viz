<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pay Type Mix</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<div>
    <label for="facilitySelect">Choose a Facility:</label>
    <select id="facilitySelect">
        <!-- Facility options will be dynamically populated here -->
    </select>
</div>

<canvas id="payTypePieChart"></canvas>

<script>
// Placeholder for facility names
const facilities = ['Facility A', 'Facility B', 'Facility C']; // Replace with actual facility names
const facilityDropdown = document.getElementById('facilitySelect');

// Populate the dropdown with facility names
facilities.forEach((facility) => {
    let option = document.createElement('option');
    option.value = facility;
    option.text = facility;
    facilityDropdown.appendChild(option);
});

// Data for the pie chart
const data = {
    labels: [
        'Net Patient Revenue Medicare-Traditional',
        'Net Patient Revenue Medicare-Managed Care',
        'Net Patient Revenue Medi-Cal-Traditional',
        'Net Patient Revenue Medi-Cal-Managed Care',
        'Net Patient Revenue County Indigent Programs-Traditional & Man. Care',
        'Net Patient Revenue Other Third Parties-Traditional',
        'Net Patient Revenue Other Third Parties-Managed Care',
        'Net Patient Revenue Other Indigent',
        'Net Patient Revenue Other Payers'
    ],
    datasets: [{
        label: 'Pay Type Mix',
        data: [81.64, 43.41, 44.95, 70.24, 12.74, 41.18, 115.12, 0.45, 7.27],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#F7464A',
            '#46BFBD',
            '#FDB45C',
            '#949FB1',
            '#4D5360'
        ],
        hoverOffset: 4
    }]
};

// Initialize the pie chart
const ctx = document.getElementById('payTypePieChart').getContext('2d');
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pay Type Mix'
            }
        }
    },
});

// Event listener for the dropdown to filter the data for the selected facility
facilityDropdown.addEventListener('change', function() {
    // You will need to write the logic to filter the data based on the selected facility
    // This might involve fetching new data or filtering the dataset you already have
    // For demonstration, this will simply log the selected value
    console.log(`Facility selected: ${this.value}`);
});

</script>
</body>
</html>
