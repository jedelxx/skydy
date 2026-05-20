const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Check if it exists and hasn't already been hidden
    if (loadingScreen && !loadingScreen.classList.contains('fade-out-loader')) {
        loadingScreen.classList.add('fade-out-loader');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
};

// 2. Try to hide it exactly when everything finishes loading (The perfect scenario)
window.addEventListener('load', hideLoadingScreen);

// 3. THE FAILSAFE: If 3.5 seconds pass, force it to hide no matter what! (The backup plan)
setTimeout(hideLoadingScreen, 3500);

    const menuIcon = document.querySelector('.menu-icon');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelector('.nav-links');
    const logoContainer = document.querySelector('.logo-container');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    const bgImages = [
    'url("images/wp.jpg")',
    'url("images/wp1.jpg")', 
    'url("images/wp2.jpg")',
    'url("images/wp3.jpg")', 
    'url("images/wp4.jpg")', 
];
    
const slider = document.getElementById('bg-slider');
let currentImageIndex = 0;

slider.style.backgroundImage = bgImages[0];

setInterval(() => {
    slider.style.opacity = 0;

    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % bgImages.length; 
        slider.style.backgroundImage = bgImages[currentImageIndex];
        slider.style.opacity = 1; 
    }, 1000); 
}, 6000);

const modal = document.getElementById('space-modal');
const closeBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

const allCards = document.querySelectorAll('.space-card');

allCards.forEach(card => {
    card.addEventListener('click', (event) => {
        
        // If they click the book now button, redirect!
        if (event.target.classList.contains('book-now-card') || event.target.classList.contains('book-now-text')) {
            window.location.href = "#"; 
        } else {
            // MAGIC HAPPENS HERE: Read the data from the clicked card
            const customTitle = card.getAttribute('data-title');
            const customPrice = card.getAttribute('data-price');
            const customDesc = card.getAttribute('data-desc');

            modalTitle.textContent = customTitle;
            modalPrice.textContent = customPrice;
            modalDesc.textContent = customDesc;

            modal.style.display = 'flex';
        }
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});