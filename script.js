// Define the Unsplash API access key
const accessKey = 'KaD6o2jifbNMLxNz0xJ6UuG9aLNwDZP4l421WiXJPBU';

// Get the DOM elements for displaying error messages and images
const errorResult = document.getElementById("error-result");
const imageResult = document.getElementById("image-result");
const searchInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");

// Function to fetch images based on user input
async function fetchSearchImg() {
    // Generate a random page number for the API query
    const randomNumber = Math.floor(Math.random() * 30) + 1;
    // Get the user input value for the search query
    const value = searchInput.value;
    // Construct the Unsplash API URL for searching photos
    const searchURL = `https://api.unsplash.com/search/photos?page=${randomNumber}&query=${value}&client_id=${accessKey}&per_page=30`;

    try {
        // Fetch data from the Unsplash API
        const response = await fetch(searchURL);
        // Parse the JSON response
        const data = await response.json();

        // Check if there are no results
        if(data.results.length === 0) {
            // Clear previous images
            imageResult.innerHTML = null;
            // Display an error message if no images are found
            errorResult.innerHTML = 
            `<section class="error">
                <img src="error.png" alt="">
                <p class="error__message">We're sorry, but the image you're looking for cannot be found. Please check the URL or try refreshing the page.</p>
            </section>`;
        } else { 
            // Clear any previous error messages
            errorResult.innerHTML = null;
            // Clear previous images
            imageResult.innerHTML = null; 
            // Loop through the results and create image elements
            data.results.forEach(image => {
                // Create an anchor element for the image
                const anchor = document.createElement('a');
                anchor.href = image.links.download; // Set the download link
                anchor.target = "_blank"; // Open link in a new tab

                // Create an image element
                const img = document.createElement('img');
                img.src = image.urls.small; // Set the image source
                img.alt = image.alt_description || "Random Unsplash Image"; // Set alt text
                img.title = image.alt_description; // Set title for the image

                // Append the image to the anchor
                anchor.appendChild(img);
                // Append the anchor to the image results container
                imageResult.appendChild(anchor);
            });
        }

    } catch (error) {
        // Log any errors encountered during fetch
        console.error("Error fetching data:", error.message);
    }
}

// Add event listener to the search button to trigger image fetch
searchButton.addEventListener('click', fetchSearchImg);
// Add event listener for the Enter key to trigger image fetch
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchSearchImg();
    }
});

// Function to fetch random images from Unsplash
async function fetchRandomImg() {
    // Construct the URL for fetching random images
    const randomURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;

    try {
        // Fetch data from the Unsplash API
        const response = await fetch(randomURL);
        // Check if the response is okay
        if (!response.ok) {
            throw new Error("HTTP error!: Response is not Okay!");
        } else {
            // Parse the JSON response
            const data = await response.json();

            // Loop through the random images and create elements
            data.forEach(image => {
                // Create an anchor element for the image
                const anchor = document.createElement('a');
                anchor.href = image.links.download; // Set the download link
                anchor.target = "_blank"; // Open link in a new tab

                // Create an image element
                const img = document.createElement('img');
                img.src = image.urls.small; // Set the image source
                img.alt = image.alt_description || "Random Unsplash Image"; // Set alt text

                // Append the image to the anchor
                anchor.appendChild(img);
                // Append the anchor to the image results container
                imageResult.appendChild(anchor);
            });
        }
    } catch (error) {
        // Log any errors encountered during fetch
        console.error("Error fetching data:", error.message);
    }
}

// Fetch random images when the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', fetchRandomImg);
