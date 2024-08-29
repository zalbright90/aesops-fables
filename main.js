let fables = [];

// Fetch fables from fables.json
fetch('fables.json')
    .then(response => response.json())
    .then(data => {
        fables = data.fables;
        populateDropdown();
        loadDefaultFable();
    })
    .catch(error => console. error('Error loading fables', error));

// Function to populate the dropdown with the title from fables.json
function populateDropdown() {
    const selectElement = document.getElementById('fable-select');
    fables.forEach(fable => {
        const option = document.createElement('option');
        option.value = fable.id;
        option.textContent = fable.title;
        selectElement.appendChild(option);
    });
}

// Function to load fable content
function loadFable(id) {
    const fable = fables.find(f => f.id === id);
    if (fable) {
        const contentElement = document.getElementById('fable-content');
        contentElement.style.opacity = 0;
        setTimeout(() => {
            contentElement.innerHTML = `
                <h2>${fable.title}</h2>
                <p>${fable.content}</p>
                <img src="${fable.image}" alt="Illustration for ${fable.title}">
                <p><strong>Moral:</strong> ${fable.moral}</p>
            `;
            contentElement.style.opacity = 1;
        }, 300);
    } else {
        console.error('Fable not found');
    }
}

function loadDefaultFable() {
    if (fables.length > 0) {
        loadFable(fables[0].id);
    }
}

// Function to load random fable
function loadRandomFable() {
    const randomIndex = Math.floor(Math.random() * fables.length);
    loadFable(fables[randomIndex].id);
    document.getElementById('fable-select').value = fables[randomIndex].id;
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Make .navbar always stay at the top while scrolling
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('sticky', window.scrollY > 0);
});

// Event Listeners
document.getElementById('fable-select').addEventListener('change', function(event) {
    loadFable(event.target.value);
});

document.getElementById('random-fable').addEventListener('click', loadRandomFable);