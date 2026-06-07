setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600); 
    }
}, 2000);

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

const monthYearText = document.getElementById('month-year');
const calendarDays = document.getElementById('calendar-days');
const selectedDateText = document.getElementById('selected-date-text');

if (calendarDays) {
    let currentDate = new Date(); 

    function renderCalendar() {
        calendarDays.innerHTML = ''; 
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        monthYearText.textContent = `${monthNames[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }
        
// --- ADDED: Get exact midnight today for accurate comparison ---
        const actualToday = new Date();
        actualToday.setHours(0, 0, 0, 0); 
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;
            
            // Creates a real Date object for the specific day being generated
            const cellDate = new Date(year, month, i);
            
            // --- THE CHECK: Is this day in the past? ---
            if (cellDate < actualToday) {
                
                // If it's in the past, add the disabled class and skip the click listener
                dayDiv.classList.add('disabled-date');
                
            } else {
                
                // If it's today or in the future, make it clickable as usual!
                dayDiv.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    dayDiv.classList.add('selected');
                    selectedDateText.textContent = `Selected Date: ${monthNames[month]} ${i}, ${year}`;
                    
                    hasSelectedDate = true;
                    validateFormState();
                });
                
            }
            
            calendarDays.appendChild(dayDiv);
        }
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}

const floorMap = document.getElementById('floor-map');
const seatDropdown = document.getElementById('seat-dropdown');
const processBookingBtn = document.getElementById('process-booking-btn');

// 1. ADDED: A variable to track if a date has been clicked
let hasSelectedDate = false;

// 2. UPDATED: The State Machine now checks BOTH conditions
function validateFormState() {
    const selectedSeat = seatDropdown.value;
    const isSeatSelected = selectedSeat !== "" && selectedSeat !== null;
    
    // The button only unlocks if BOTH a seat AND a date are selected
    if (isSeatSelected && hasSelectedDate) {
        processBookingBtn.classList.remove('disabled');
    } else {
        processBookingBtn.classList.add('disabled');
    }
}

if (floorMap) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTypeFilter = urlParams.get('type'); 
    seatDropdown.innerHTML = '<option value="" disabled selected> Select a Seat </option>';

    const seatDatabase = [
        // --- SPECIAL ROOMS & UTILITIES ---
        { id: 'Comfort Room', type: 'cr', top: '-5%', left: '8%' }, 
        { id: 'Pantry', type: 'pantry', top: '-5%', left: '32%' }, 
        { id: 'Reception', type: 'cr', top: '63%', left: '8%' }, 

        // --- ROOM SECTIONS ---
        { id: 'SL1', type: 'sky-line-room', top: '15%', left: '8%' },
        { id: 'SD1', type: 'sky-den-room', top: '22%', left: '30%' },
        { id: 'SB1', type: 'sky-booth-room', top: '15%', left: '30%' },

        // --- SKY CIRCLE ---
        { id: 'SC1', type: 'sky-circle-room', top: '62.1%', left: '74%', status: 'available' },
        { id: 'SC2', type: 'sky-circle-room', top: '69%', left: '74%', status: 'available' },

        // --- COLLAB NOOK ---
        { id: 'CN1', type: 'collab-nook-seat', top: '-5%', left: '40%', status: 'available' },
        
        // --- THINK SPOT SEATS ---
        { id: 'TS1', type: 'think-spot-seat', top: '33%', left: '24%', status: 'available' }, 
        { id: 'TS2', type: 'think-spot-seat', top: '40%', left: '22%', status: 'available' }, 
        { id: 'TS3', type: 'think-spot-seat', top: '39%', left: '27%', status: 'available' }, 

        // --- DESIGN DOCK SEATS ---
        { id: 'DD1', type: 'design-dock-seat', top: '52%', left: '18%', status: 'available'}, 
        { id: 'DD2', type: 'design-dock-seat', top: '35%', left: '10%', status: 'available'},
        { id: 'DD3', type: 'design-dock-seat', top: '45%', left: '10%', status: 'available'},

        // --- SKY POD BOOTHS ---
        { id: 'SP1', type: 'sky-pod-room', top: '-3%', left: '74%', status: 'available' },
        { id: 'SP2', type: 'sky-pod-room', top: '4%', left: '74%', status: 'available' },
        
        // --- FOCUS POD SEATS ---
        { id: 'FP1', type: 'focus-pod-seat', top: '52.8%', left: '46%', status: 'available' },
        { id: 'FP2', type: 'focus-pod-seat', top: '59.1%', left: '46%', status: 'available' },
        { id: 'FP3', type: 'focus-pod-seat', top: '65.5%', left: '46%', status: 'available' },
        { id: 'FP4', type: 'focus-pod-seat', top: '71.7%', left: '46%', status: 'available' },
        { id: 'FP5', type: 'focus-pod-seat', top: '52.8%', left: '52%', status: 'available' },
        { id: 'FP6', type: 'focus-pod-seat', top: '59.1%', left: '52%', status: 'available' },
        { id: 'FP7', type: 'focus-pod-seat', top: '65.5%', left: '52%', status: 'available' },
        { id: 'FP8', type: 'focus-pod-seat', top: '71.7%', left: '52%', status: 'available' },
        { id: 'FP9', type: 'focus-pod-seat', top: '59.1%', left: '58%', status: 'available' },
        { id: 'FP10', type: 'focus-pod-seat', top: '65.6%', left: '58%', status: 'available' },
        { id: 'FP11', type: 'focus-pod-seat', top: '71.7%', left: '58%', status: 'available' },

        { id: 'FP12', type: 'focus-pod-seat', top: '50%', left: '77.5%', status: 'available' },
        { id: 'FP13', type: 'focus-pod-seat', top: '50%', left: '73.2%', status: 'available' },
        { id: 'FP14', type: 'focus-pod-seat', top: '50%', left: '69%', status: 'available' },
        { id: 'FP15', type: 'focus-pod-seat', top: '40.8%', left: '77.5%', status: 'available' },
        { id: 'FP16', type: 'focus-pod-seat', top: '40.8%', left: '73.2%', status: 'available' },
        { id: 'FP17', type: 'focus-pod-seat', top: '40.8%', left: '69%', status: 'available' },
        { id: 'FP18', type: 'focus-pod-seat', top: '40.8%', left: '64.8%', status: 'available' },
        { id: 'FP19', type: 'focus-pod-seat', top: '40.8%', left: '60.5%', status: 'unavailable' },

        { id: 'FP20', type: 'focus-pod-seat', top: '34.1%', left: '77.5%', status: 'available' },
        { id: 'FP21', type: 'focus-pod-seat', top: '34.1%', left: '73.2%', status: 'available' },
        { id: 'FP22', type: 'focus-pod-seat', top: '34.1%', left: '64.8%', status: 'available' },
        { id: 'FP23', type: 'focus-pod-seat', top: '34.1%', left: '60.5%', status: 'available' },
        { id: 'FP24', type: 'focus-pod-seat', top: '34.1%', left: '56.3%', status: 'available' },

        { id: 'FP25', type: 'focus-pod-seat', top: '20%', left: '77.1%', status: 'available' },
        { id: 'FP26', type: 'focus-pod-seat', top: '20%', left: '72.9%', status: 'available' },
        { id: 'FP27', type: 'focus-pod-seat', top: '20%', left: '68.6%', status: 'available' },
        { id: 'FP28', type: 'focus-pod-seat', top: '20%', left: '64.4%', status: 'available' },
        { id: 'FP29', type: 'focus-pod-seat', top: '20%', left: '60.1%', status: 'available' },

        { id: 'FP30', type: 'focus-pod-seat', top: '13%', left: '77.1%', status: 'available' },
        { id: 'FP31', type: 'focus-pod-seat', top: '13%', left: '72.9%', status: 'available' },
        { id: 'FP32', type: 'focus-pod-seat', top: '13%', left: '68.6%', status: 'available' },
        { id: 'FP33', type: 'focus-pod-seat', top: '13%', left: '64.4%', status: 'available' },
        { id: 'FP34', type: 'focus-pod-seat', top: '13%', left: '60.1%', status: 'available' },
        { id: 'FP35', type: 'focus-pod-seat', top: '2%', left: '40%', status: 'available' },

        // --- FLOW ROW SEATS ---
        { id: 'FR1', type: 'flow-row-seat', top: '34%', left: '43.5%', status: 'available'},
        { id: 'FR2', type: 'flow-row-seat', top: '40.5%', left: '43.5%', status: 'available'},
        { id: 'FR3', type: 'flow-row-seat', top: '34%', left: '47.3%', status: 'available'},
        { id: 'FR4', type: 'flow-row-seat', top: '40.5%', left: '47.3%', status: 'available'},
        { id: 'FR5', type: 'flow-row-seat', top: '15%', left: '45%', status: 'available'},
        { id: 'FR6', type: 'flow-row-seat', top: '22%', left: '45%', status: 'available'},
        { id: 'FR7', type: 'flow-row-seat', top: '15%', left: '48.7%', status: 'available'},
        { id: 'FR8', type: 'flow-row-seat', top: '22%', left: '48.7%', status: 'available'},

        // --- POWER BAR ---
        { id: 'PB1', type: 'power-bar-seat', top: '-5%', left: '48%', status: 'available' },
        { id: 'PB2', type: 'power-bar-seat', top: '-5%', left: '54%', status: 'available' },
        { id: 'PB3', type: 'power-bar-seat', top: '-5%', left: '60%', status: 'available' },
        { id: 'PB4', type: 'power-bar-seat', top: '2%', left: '48%', status: 'available' },
        { id: 'PB5', type: 'power-bar-seat', top: '2%', left: '54%', status: 'available' },
        { id: 'PB6', type: 'power-bar-seat', top: '2%', left: '60%', status: 'available' }
    ];

    seatDatabase.forEach(seatData => {
        const seatElement = document.createElement('div');
        seatElement.className = `seat ${seatData.type}`;
        seatElement.id = `map-seat-${seatData.id}`; 
        
        if (seatData.status === 'unavailable') {
            seatElement.classList.add('unavailable');
        }
        
        seatElement.style.top = seatData.top;
        seatElement.style.left = seatData.left;
        seatElement.textContent = seatData.id;

        const matchesFilter = !selectedTypeFilter || seatData.type === selectedTypeFilter;

        if (matchesFilter) {
            seatElement.style.opacity = '1'; 
            if (seatData.status === 'available') {
                seatElement.classList.add('zone-highlight');
            }
        } else {
            seatElement.style.opacity = '0.15'; 
        }

        if (seatData.status === 'available') {
            if (matchesFilter) {
                const optionElement = document.createElement('option');
                optionElement.value = seatData.id;
                optionElement.textContent = `${seatData.id} (${seatData.type.replace(/-/g, ' ')})`;
                seatDropdown.appendChild(optionElement);
            }

            // BIDIRECTIONAL MAPPING CLICK LISTENER
            seatElement.addEventListener('click', () => {
                if (matchesFilter) {
                    document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
                    seatElement.classList.add('selected');
                    seatDropdown.value = seatData.id;
                    
                    // Immediately unlocks button on vector map tab select actions
                    validateFormState();
                }
            });
        }

        floorMap.appendChild(seatElement);
    });

    seatDropdown.addEventListener('change', (e) => {
        const selectedSeatId = e.target.value;
        document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
        
        const targetMapNode = document.getElementById(`map-seat-${selectedSeatId}`);
        if (targetMapNode) {
            targetMapNode.classList.add('selected');
        }

        // Immediately evaluates if submission criteria targets meet safety guidelines
        validateFormState();
    });
}