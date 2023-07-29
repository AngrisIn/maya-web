// Global variable to store the selected cartoon style
let currentStyle = "mickey-mouse";

// Function to handle button selection
function selectCartoonStyle(style) {
    const buttons = document.querySelectorAll(".cartoon-style-button");
    buttons.forEach(button => {
        if (button.classList.contains(style)) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
    currentStyle = style;
}

// Function to handle button clicks
function handleButtonClick(event) {
    const style = event.target.dataset.style;
    selectCartoonStyle(style);
}

// Add click event listeners to buttons
const buttons = document.querySelectorAll(".cartoon-style-button");
buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

// Select the default cartoon style (SpongeBob)
selectCartoonStyle(currentStyle);

let stopLoading = false;


// Function to simulate loading
function simulateLoading() {
    // Show loader inside the button
    const loader = document.createElement("span");
    loader.classList.add("loader");

    // Remove any existing loaders before adding a new one
    const existingLoader = document.querySelector("#generate-button .loader");
    if (existingLoader) {
        existingLoader.remove();
    }

    document.getElementById("generate-button").appendChild(loader);

    // Disable the button during loading
    document.getElementById("generate-button").classList.add("disabled")

	
	stopLoading = () => {
		// Remove loader
		document.getElementById("generate-button").removeChild(loader);

		// Enable the button again
		document.getElementById("generate-button").classList.remove("disabled");
	}

}


// Add click event listener to the "Generate Video" button
document.getElementById("generate-button").addEventListener("click", () => {
    simulateLoading();
});