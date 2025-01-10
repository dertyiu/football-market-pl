// Function to fetch players from the backend
async function fetchPlayers() {
    try {
        const response = await fetch('http://localhost:3000/players');
        const players = await response.json();
        const playersList = document.getElementById('players-list');

        // Clear existing players
        playersList.innerHTML = '';

        // Loop through the players and create cards
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'col-md-4';
            playerCard.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${player.name}</h5>
                        <p class="card-text">Team: ${player.team}</p>
                        <p class="card-text">Value: ${player.value}</p>
                    </div>
                </div>
            `;
            playersList.appendChild(playerCard);
        });
    } catch (error) {
        console.error('Error fetching players:', error);
    }
}

// Function to handle contact form submission
function handleContactForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate sending the data (for demonstration purposes)
    console.log('Contact Form Submitted:', { name, email, message });

    // Clear the form fields
    document.getElementById('contact-form').reset();
    alert('Thank you for your message! We will get back to you soon.');
}

// Fetch players on page load
document.addEventListener('DOMContentLoaded', fetchPlayers);

// Add event listener to the contact form
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}