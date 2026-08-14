
let count = 0;
let bakers = 0;
let bakerCost = 15;

// Elements for the main biscuit
const cookieButton = document.getElementById("cookieButton");
const display = document.getElementById("biscuitCount");

// Elements for the upgrade
const bakerButton = document.getElementById("bakerButton");
const bakerDisplay = document.getElementById("bakerCount");

// 1. Clicking the main biscuit
cookieButton.addEventListener("click", function() {
    count++;
    display.textContent = count;
});

// 2. Buying a Baker
bakerButton.addEventListener("click", function() {
    if (count >= bakerCost) {
        count -= bakerCost; // Spend the biscuits
        bakers++; // Add a baker
        
        // Make the next baker more expensive!
        bakerCost = Math.floor(bakerCost * 1.5); 
        
        // Update the screen text
        display.textContent = count;
        bakerDisplay.textContent = bakers;
        bakerButton.textContent = "Hire a Baker (Cost: " + bakerCost + " Biscuits)";
    } else {
        alert("You don't have enough biscuits yet!");
    }
});

// 3. The Automatic Timer (Runs every 1000 milliseconds / 1 second)
setInterval(function() {
    if (bakers > 0) {
        count += bakers; // Give 1 biscuit per second for each baker
        display.textContent = count; // Update the score on screen
    }
}, 1000);