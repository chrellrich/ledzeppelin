// Define the hue offset, maximum hue offset, and interval duration in milliseconds (adjust as needed)
const initialHueOffset = 5 // Initial fixed hue offset between each lightbulb
const maxHueOffset = 360; // Maximum hue offset
let deltaHueOffset = 1;
const intervalDuration = 10;

let currentHueOffset = initialHueOffset; // Initialize the current hue offset

// Function to count the total number of lightbulbs in the SVG
function countTotalLightbulbs() {
    const lightbulbs = document.querySelectorAll('g[id^="Lightbulb"]');
    return lightbulbs.length;
}

// Get the total number of lightbulbs
const totalLightbulbs = countTotalLightbulbs();

// Function to calculate the order of a lightbulb based on its distance from the mouse pointer
function calculateOrder(lightbulb) {
    const rect = lightbulb.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the distance between the center of the lightbulb and the mouse pointer
    const deltaX = centerX - mouseX;
    const deltaY = centerY - mouseY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Calculate the order based on the distance
    const order = Math.floor((distance / maxDistance) * totalLightbulbs) + 1;

    return order;
}

// Function to update the mouse coordinates
function updateMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Calculate the maximum distance based on the window dimensions
const maxDistance = Math.sqrt((window.innerWidth / 2) ** 2 + (window.innerHeight / 2) ** 2);

// Initialize the mouse coordinates
let mouseX = 0;
let mouseY = 0;

// Add a mousemove event listener to update the mouse coordinates
window.addEventListener('mousemove', updateMousePosition);

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
    currentHueOffset = (currentHueOffset - deltaHueOffset) % maxHueOffset; // Increment and reset if exceeding max offset
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