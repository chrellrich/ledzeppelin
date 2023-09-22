// Define the hue offset, maximum hue offset, and interval duration in milliseconds (adjust as needed)
const initialHueOffset = 10; // Initial fixed hue offset between each lightbulb
const maxHueOffset = 360; // Maximum hue offset
let deltaHueOffset = 1;
const intervalDuration = 20;

let currentHueOffset = initialHueOffset; // Initialize the current hue offset

// Function to calculate the order of a lightbulb based on its vertical position
function calculateOrder(lightbulb) {
    const rect = lightbulb.getBoundingClientRect();
    return Math.floor(rect.top / rect.height) + 1;
}

// Function to set the fill color of the first path in a lightbulb to a gradient color
function setHueColor(lightbulb, offset) {
    const order = calculateOrder(lightbulb);
    const firstPath = lightbulb.querySelector('path:first-of-type');
    if (firstPath) {
        // Calculate hue value based on the current hue offset
        const hue = ((order * offset) + currentHueOffset) % 360;
        const color = `hsl(${hue}, 100%, 50%)`; // Generate HSL color
        firstPath.style.fill = color;
    }
}

// Function to update the hue offset
function updateHueOffset() {
    currentHueOffset = (currentHueOffset + deltaHueOffset) % maxHueOffset; // Increment and reset if exceeding max offset
}

// Loop through the lightbulb elements and set hue colors for each lightbulb
function updateHueColors() {
    const lightbulbs = document.querySelectorAll('g[id^="Lightbulb"]');
    lightbulbs.forEach((lightbulb) => {
        setHueColor(lightbulb, initialHueOffset);
    });
    updateHueOffset();
}

// Update the hue colors at a regular interval to create the looping effect
intervalId = setInterval(function () {
    updateHueColors();
}, intervalDuration);

// Add an event listener to update deltaHueOffset when the slider value changes
const hueSlider = document.getElementById('hueValuePicker');
hueSlider.addEventListener('input', function () {
    deltaHueOffset = parseInt(hueSlider.value);
});

// Clear the interval when the window is closed to prevent memory leaks
window.addEventListener('beforeunload', function () {
    clearInterval(intervalId);
});