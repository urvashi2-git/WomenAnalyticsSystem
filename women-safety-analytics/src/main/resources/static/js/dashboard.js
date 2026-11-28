
// ==========================================
// HERANALYTICS - INTERACTIVE DASHBOARD
// Illustrative demo data only
// ==========================================

const states = [
    "Madhya Pradesh",
    "Maharashtra",
    "Rajasthan"
];

const years = ["2022", "2023", "2024"];

const categories = [
    "Harassment",
    "Assault",
    "Domestic Violence"
];

// Demo totals by state and year
const stateYearTotals = {
    "Madhya Pradesh": [1000, 1300, 1600],
    "Maharashtra": [1100, 1400, 1750],
    "Rajasthan": [1100, 1400, 1800]
};

// Illustrative category proportions
const proportions = [0.33735, 0.28112, 0.38153];

// Generate demo records
const demoData = [];

states.forEach((state) => {
    years.forEach((year, yearIndex) => {

        const total = stateYearTotals[state][yearIndex];

        const harassment = Math.round(total * proportions[0]);
        const assault = Math.round(total * proportions[1]);
        const domestic = total - harassment - assault;

        demoData.push(
            {
                state: state,
                year: year,
                category: "Harassment",
                cases: harassment
            },
            {
                state: state,
                year: year,
                category: "Assault",
                cases: assault
            },
            {
                state: state,
                year: year,
                category: "Domestic Violence",
                cases: domestic
            }
        );
    });
});

// Chart colours
const wine = "#421323";
const burgundy = "#5A2038";
const rose = "#A65378";
const softRose = "#E8C6D1";
const mutedText = "#806B72";
const gridColor = "#EBD7D9";

// HTML elements
const stateFilter = document.getElementById("stateFilter");
const yearFilter = document.getElementById("yearFilter");
const categoryFilter = document.getElementById("categoryFilter");

const totalCasesElement = document.getElementById("totalCases");

const statesCoveredElement = document.querySelector(
    ".stat-card:nth-child(2) h2"
);

const yearsCoveredElement = document.querySelector(
    ".stat-card:nth-child(3) h2"
);

const trendCanvas = document.getElementById("trendChart");
const categoryCanvas = document.getElementById("categoryChart");

let trendChart;
let categoryChart;

// Create charts
if (trendCanvas && categoryCanvas && typeof Chart !== "undefined") {

    trendChart = new Chart(trendCanvas, {
        type: "line",

        data: {
            labels: years,
            datasets: [{
                label: "Illustrative reported cases",
                data: [0, 0, 0],
                borderColor: burgundy,
                backgroundColor: "rgba(166, 83, 120, 0.13)",
                pointBackgroundColor: rose,
                pointBorderColor: "#FFFFFF",
                pointBorderWidth: 3,
                pointRadius: 6,
                borderWidth: 3,
                fill: true,
                tension: 0.35
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: wine,
                        usePointStyle: true
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: mutedText },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: mutedText },
                    grid: { color: gridColor }
                }
            }
        }
    });

    categoryChart = new Chart(categoryCanvas, {
        type: "bar",

        data: {
            labels: categories,
            datasets: [{
                label: "Illustrative cases",
                data: [0, 0, 0],
                backgroundColor: [
                    burgundy,
                    rose,
                    softRose
                ],
                borderRadius: 8,
                maxBarThickness: 65
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: mutedText },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: mutedText },
                    grid: { color: gridColor }
                }
            }
        }
    });

    // Update dashboard whenever a filter changes
    function updateDashboard() {

        const selectedState = stateFilter.value;
        const selectedYear = yearFilter.value;
        const selectedCategory = categoryFilter.value;

        // Apply selected filters
        const filteredData = demoData.filter(item => {

            const stateMatch =
                selectedState === "All" ||
                item.state === selectedState;

            const yearMatch =
                selectedYear === "All" ||
                item.year === selectedYear;

            const categoryMatch =
                selectedCategory === "All" ||
                item.category === selectedCategory;

            return stateMatch && yearMatch && categoryMatch;
        });

        // Calculate total cases
        const totalCases = filteredData.reduce(
            (sum, item) => sum + item.cases, 0
        );

        // Count states and years represented
        const statesCount = new Set(
            filteredData.map(item => item.state)
        ).size;

        const yearsCount = new Set(
            filteredData.map(item => item.year)
        ).size;

        // Update statistics cards
        totalCasesElement.textContent =
            totalCases.toLocaleString("en-IN");

        statesCoveredElement.textContent = statesCount;
        yearsCoveredElement.textContent = yearsCount;

        // Calculate year-wise chart data
        const trendValues = years.map(year => {

            return filteredData
                .filter(item => item.year === year)
                .reduce((sum, item) => sum + item.cases, 0);

        });

        // Calculate category-wise chart data
        const categoryValues = categories.map(category => {

            return filteredData
                .filter(item => item.category === category)
                .reduce((sum, item) => sum + item.cases, 0);

        });

        // Refresh charts
        trendChart.data.datasets[0].data = trendValues;
        trendChart.update();

        categoryChart.data.datasets[0].data = categoryValues;
        categoryChart.update();
    }

    // Listen for filter changes
    stateFilter.addEventListener("change", updateDashboard);
    yearFilter.addEventListener("change", updateDashboard);
    categoryFilter.addEventListener("change", updateDashboard);

    // Load initial dashboard
    updateDashboard();

} else {
    console.error("Chart.js or dashboard elements not found.");
}
