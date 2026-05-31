/* ==========================================================================
   1. SCREEN LOADER LOGIC
   ========================================================================== */
const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen && !loadingScreen.classList.contains('fade-out-loader')) {
        loadingScreen.classList.add('fade-out-loader');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
};

window.addEventListener('load', hideLoadingScreen);
setTimeout(hideLoadingScreen, 3500); // Fail-safe fallback timeout

/* ==========================================================================
   2. SIDEBAR NAVIGATION CONTROLLER
   ========================================================================== */
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

if (menuIcon && sidebar) {
    menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}

/* ==========================================================================
   3. BACKGROUND IMAGE TRANSITION SLIDER
   ========================================================================== */
const bgImages = [
    'url("images/wp.jpg")',
    'url("images/wp1.jpg")', 
    'url("images/wp2.jpg")',
    'url("images/wp3.jpg")', 
    'url("images/wp4.jpg")', 
];
    
const slider = document.getElementById('bg-slider');
if (slider) {
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
}

/* ==========================================================================
   4. SPACES CARD MODAL OVERLAY & INTEGRATED SLIDESHOW CAROUSEL
   ========================================================================== */
// FIXED: These IDs now perfectly match your HTML elements!
const modal = document.getElementById('global-modal-overlay');
const closeBtn = document.getElementById('modal-close-trigger');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const allCards = document.querySelectorAll('.space-card');

// Dynamic image portfolio database maps to your clicked card title names
const workspaceImageDatabase = {
    "FOCUS POD": ["images/skydy-cover.jpg", "images/SC0.5.jpeg", "images/TS2.jpeg"],
    "POWER BAR": ["images/Pantry1.jpeg", "images/Pantry2.jpeg", "images/wp1.jpg"],
    "DESIGN DOCK": ["images/DDCloseUp.jpeg", "images/wp2.jpg", "images/wp3.jpg"],
    "THINK SPOT": ["images/TS2.jpeg", "images/wp4.jpg", "images/skydy-cover.jpg"],
    "COLLAB NOOK": ["images/temp-table.png", "images/wp1.jpg", "images/wp2.jpg"],
    "FLOW ROW": ["images/temp-table.png", "images/wp4.jpg", "images/SC0.5.jpeg"],
    "SKY POD": ["images/sky_pod.png", "images/wp2.jpg", "images/wp1.jpg"],
    "SKY CIRCLE": ["images/temp-table.png", "images/wp4.jpg", "images/wp3.jpg"]
};

if (modal && allCards.length > 0) {
    allCards.forEach(card => {
        card.addEventListener('click', (event) => {
            
            // Check if the user clicked the direct "Book Now" link button inside the preview card
            if (event.target.classList.contains('book-now-card') || event.target.classList.contains('book-now-text') || event.target.closest('.book-now-card')) {
                const targetBookingUrl = card.querySelector('.book-now-card').getAttribute('href');
                window.location.href = targetBookingUrl;
                return; // Stop running code below so modal does not instantly flash open
            }

            // Extract text string values from the clicked space-card
            const customTitle = card.getAttribute('data-title');
            const customPrice = card.getAttribute('data-price');
            const customDesc = card.getAttribute('data-desc');

            // Inject the matching data values cleanly onto the modal fields
            if (modalTitle) modalTitle.textContent = customTitle;
            if (modalPrice) modalPrice.textContent = customPrice;
            if (modalDesc) modalDesc.textContent = customDesc;

            // Sync the target filter link value onto the inner modal booking button element
            const modalActionBtn = document.getElementById('modal-action-btn');
            if (modalActionBtn) {
                const innerSpaceTypeFilter = card.querySelector('.book-now-card')?.getAttribute('href') || '#';
                modalActionBtn.setAttribute('href', innerSpaceTypeFilter);
            }

            // --- GENERATE POPUP SLIDESHOW LOGIC CAROUSEL ---
            const carouselTrack = document.getElementById('popup-slider-track');
            const carouselNavDots = document.getElementById('popup-slider-navigation-dots');

            if (carouselTrack && carouselNavDots) {
                carouselTrack.innerHTML = ''; // Wipe clean previous card images
                carouselNavDots.innerHTML = ''; // Wipe clean previous navigation dot tracks

                // Pull the matching image list array from your dashboard database map structure
                const chosenSpaceImages = workspaceImageDatabase[customTitle] || ["images/skydy-cover.jpg"];

                chosenSpaceImages.forEach((imgUrlPath, imgIndex) => {
                    // Create image layout rendering frame nodes
                    const imageElement = document.createElement('img');
                    imageElement.src = imgUrlPath;
                    imageElement.id = `modal-img-node-${imgIndex}`;
                    imageElement.alt = `${customTitle} slideshow view`;
                    carouselTrack.appendChild(imageElement);

                    // Create companion navigation anchor point dots
                    const dotElement = document.createElement('a');
                    dotElement.href = `#modal-img-node-${imgIndex}`;
                    dotElement.className = `card-nav-dot ${imgIndex === 0 ? 'active' : ''}`;
                    
                    // Handle dynamic item snap transitions on button tap gestures
                    dotElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        imageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                        carouselNavDots.querySelectorAll('.card-nav-dot').forEach(d => d.classList.remove('active'));
                        dotElement.classList.add('active');
                    });

                    carouselNavDots.appendChild(dotElement);
                });

                // Automated dot accent focus toggling while dragging images horizontally with your finger
                carouselTrack.addEventListener('scroll', () => {
                    const trackingWidthMetric = carouselTrack.offsetWidth;
                    const trackingLeftOffsetMetric = carouselTrack.scrollLeft;
                    const calculatedCurrentIndex = Math.round(trackingLeftOffsetMetric / trackingWidthMetric);
                    
                    const dotIndicatorNodes = carouselNavDots.querySelectorAll('.card-nav-dot');
                    dotIndicatorNodes.forEach((dotNode, pointerIndex) => {
                        if (pointerIndex === calculatedCurrentIndex) {
                            dotNode.classList.add('active');
                        } else {
                            dotNode.classList.remove('active');
                        }
                    });
                });
            }

            modal.style.display = 'flex';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}