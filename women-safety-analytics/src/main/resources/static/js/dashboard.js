
// Illustrative demo data only.
// Replace with real API data after backend integration.

const years = ["2022", "2023", "2024"];

const trendData = [3200, 4100, 5150];

const categoryData = [4200, 3500, 4750];

const trendCanvas = document.getElementById("trendChart");

const categoryCanvas = document.getElementById("categoryChart");

let trendChart;
let categoryChart;

if (trendCanvas && categoryCanvas && typeof Chart !== "undefined") {

    trendChart = new Chart(trendCanvas, {
        type: "line",

        data: {
            labels: years,

            datasets: [{
                label: "Illustrative reported cases",
                data: trendData,
                borderColor: "#805394",
                backgroundColor: "#eadcf5",
                fill: true,
                tension: 0.3
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true,

            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    categoryChart = new Chart(categoryCanvas, {
        type: "bar",

        data: {
            labels: [
                "Harassment",
                "Assault",
                "Domestic Violence"
            ],

            datasets: [{
                label: "Illustrative cases",
                data: categoryData,
                backgroundColor: [
                    "#b58bc4",
                    "#d6a9c8",
                    "#9871ae"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Filter controls are currently visual placeholders.
// Real filtering will be connected to backend APIs.
