// Import API endpoint from config.js.
import { API_PROD_ENDPOINT } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
    const countPlaceholder = document.getElementById('visitor-count-placeholder');
    if (!countPlaceholder) {
        console.error("Missing #visitor-count-placeholder element.");
        return;
    }
// Fetch visitor count from the API endpoint.
    fetch(API_PROD_ENDPOINT, { method: 'POST', cache: 'no-store' })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data && data.count !== undefined) {
                // Ensure count is rendered as a str, despite only being returned as either str or num.
                countPlaceholder.textContent = String(data.count); 
            } else {
                throw new Error('Invalid data format');
            }
        })
        .catch(error => { 
            countPlaceholder.textContent = 'Error';
            console.error('Error fetching visitor count:', error);
        });
});

