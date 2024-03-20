// Function to open the contact form overlay
function openContactForm() {
    const contactOverlay = document.getElementById('contactOverlay');
    contactOverlay.style.display = 'block';
}

// Function to close the contact form overlay
function closeContactForm() {
    const contactOverlay = document.getElementById('contactOverlay');
    contactOverlay.style.display = 'none';
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Open the contact form when the button is clicked
document.getElementById('openContactButton').addEventListener('click', openContactForm);

// Close the contact form when the close button is clicked
document.getElementById('closeButton').addEventListener('click', closeContactForm);

// Close the contact form when clicking outside the form
window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('contactOverlay')) {
        closeContactForm();
    }
});

// Handle sending the message (this is a placeholder, you can customize it)
document.getElementById('sendMessageButton').addEventListener('click', function () {
    alert('Message sent!'); // Replace this with your desired functionality
});

// Toggle dark mode when the button is clicked
document.getElementById('toggleDarkModeButton').addEventListener('click', toggleDarkMode);