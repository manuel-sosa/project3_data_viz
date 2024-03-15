// public/script.js

document.addEventListener('DOMContentLoaded', async () => {
    const hospitalSelect = document.getElementById('hospitalSelect');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');
  
    // Fetch list of hospitals and populate the dropdown
    const response = await fetch('/api/hospital_ids');
    const hospitalids = await response.json();
  
    hospitalids.forEach((hospital) => {
      const option = document.createElement('option');
      option.value = hospital.hospitalid;
      option.textContent = hospital.hospitalid;
      hospitalSelect.appendChild(option);
    });
  
    submitBtn.addEventListener('click', async () => {
      const selectedhospitalid = hospitalSelect.value;
      const response = await fetch(`/api/hospital_data/${selectedhospitalid}`);
      const data = await response.json();
  
      // Display query results in the result container
      let html = '<table>';
      html += '<thead><tr><th>Name</th><th>Location</th><th>Capacity</th></tr></thead>';
      html += '<tbody>';
      data.forEach((row) => {
        html += `<tr><td>${row.name}</td><td>${row.location}</td><td>${row.capacity}</td></tr>`;
      });
      html += '</tbody></table>';
      resultContainer.innerHTML = html;
    });
  });
  