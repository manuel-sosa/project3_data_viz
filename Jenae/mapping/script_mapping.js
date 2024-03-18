document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('hospitalDropdown');
    const map = L.map('map').setView([36.778259, -119.417931], 5); // Set initial view

    // Initialize Leaflet tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Function to update map based on selected hospital
    function updateMap(selectedHospitalName) {
        fetch(`/hospital_location?hospitalname=${selectedHospitalName}`)
            .then(response => response.json())
            .then(data => {
                const { latitude, longitude } = data;
                map.setView([latitude, longitude], 13); // Set map view to hospital location
                L.marker([latitude, longitude]).addTo(map); // Add marker at hospital location
            })
            .catch(error => console.error('Error fetching hospital location:', error));
    }

    // Event listener for dropdown change
    dropdown.addEventListener('change', () => {
        const selectedHospitalName = dropdown.value;
        if (selectedHospitalName !== '') {
            // Clear existing markers from the map
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            updateMap(selectedHospitalName);
        }
    });

    // Fetch hospital data and populate dropdown
    fetch('/hospital_location')
        .then(response => response.json())
        .then(data => {
            data.forEach(hospital => {
                const option = document.createElement('option');
                option.value = hospital.hospitalname;
                option.text = hospital.hospitalname;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching hospital data:', error));
});


// // script_mapping.js
// document.addEventListener('DOMContentLoaded', () => {
//     const dropdown = document.getElementById('hospitalDropdown');
//     const map = L.map('map').setView([0, 0], 13); // Set initial view

//     // Initialize Leaflet tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 18,
//     }).addTo(map);

//     // Function to update map based on selected hospital
//     function updateMap(selectedHospitalName) {
//         fetch(`/hospital_location?hospitalname=${selectedHospitalName}`)
//             .then(response => response.json())
//             .then(data => {
//                 const { latitude, longitude } = data;
//                 map.setView([latitude, longitude], 13); // Set map view to hospital location
//                 L.marker([latitude, longitude]).addTo(map); // Add marker at hospital location
//             })
//             .catch(error => console.error('Error fetching hospital location:', error));
//     }

//     // Event listener for dropdown change
//     dropdown.addEventListener('change', () => {
//         const selectedHospitalName = dropdown.value;
//         if (selectedHospitalName !== '') {
//             // Clear existing markers from the map
//             map.eachLayer(layer => {
//                 if (layer instanceof L.Marker) {
//                     map.removeLayer(layer);
//                 }
//             });
//             updateMap(selectedHospitalName);
//         }
//     });

//     // Fetch hospital names and populate dropdown
//     fetch('/api/hospital_names')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             data.forEach(hospital => {
//                 const option = document.createElement('option');
//                 option.value = hospital.hospitalname;
//                 option.text = hospital.hospitalname;
//                 dropdown.appendChild(option);
//             });
//         })
//         .catch(error => console.error('Error fetching hospital names:', error.message));
// });
