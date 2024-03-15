<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pay Type Mix, %</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- Including Chart.js -->
</head>
<body>

<div style="width: 600px;">
    <canvas id="payTypeMixChart"></canvas>
</div>

<script>
    var ctx = document.getElementById('payTypeMixChart').getContext('2d');

    var payTypeMixChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Other Third Parties-Managed Care',
                'Medi-Cal-Managed Care',
                'Medicare-Traditional',
                'Medicare-Managed Care',
                'Medi-Cal-Traditional',
                'Other Third Parties-Traditional',
                'Other Payers',
                'County Indigent Programs-Tradi. & Man. Care',
                'Other Indigent'
            ],
            datasets: [{
                label: 'Pay Type Mix, %',
                data: [40, 17, 16, 12, 10, 4, 1, 0, 0],
                backgroundColor: [
                    '#3366CC',
                    '#DC3912',
                    '#FF9900',
                    '#109618',
                    '#990099',
                    '#3B3EAC',
                    '#0099C6',
                    '#DD4477',
                    '#66AA00'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            layout: {
                padding: {
                    top: 0 // Minimized padding at the top of the chart area
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Pay Type Mix, %',
                    padding: {
                        bottom: 0 // Reduced padding below the title
                    }
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 10,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            responsive: true,
            onClick: (evt, item, legend) => {
                if (item.length > 0) {
                    var index = item[0].index;
                    var label = payTypeMixChart.data.labels[index];
                    var value = payTypeMixChart.data.datasets[0].data[index];
                    alert(label + ': ' + value + '%');
                }
            }
        }
    });
</script>

</body>
</html>
