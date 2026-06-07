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
        }, 10000);
    }
    const sexButtons = document.querySelectorAll('.sex-toggle button');

    sexButtons.forEach(button => {
        button.addEventListener('click', function() {
            sexButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const paymentButtons = document.querySelectorAll('.payment-options button');

    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const mainCancelBtn = document.querySelector('.btn-cancel'); 
    const cancelModal = document.getElementById('cancelModal');
    const closeDialogBtn = document.querySelector('.btn-close-dialog');
    const cancelAnywayBtn = document.querySelector('.btn-cancel-anyway');

    mainCancelBtn.addEventListener('click', function() {
        cancelModal.style.display = 'flex';
    });

    closeDialogBtn.addEventListener('click', function() {
        cancelModal.style.display = 'none';
    });

    cancelAnywayBtn.addEventListener('click', function() {
        window.location.href = "index.html"; 
    });

    const proceedBtn = document.querySelector('.btn-proceed');

    proceedBtn.addEventListener('click', function(e) {
        let formIsValid = true;

        document.querySelectorAll('.error-text').forEach(msg => msg.remove());
        document.querySelectorAll('.error-border').forEach(box => box.classList.remove('error-border'));

        function triggerError(elementToHighlight, errorMessage) {
            formIsValid = false;
            elementToHighlight.classList.add('error-border');
            
            const warningMsg = document.createElement('span');
            warningMsg.className = 'error-text';
            warningMsg.innerText = errorMessage;
            
            elementToHighlight.insertAdjacentElement('afterend', warningMsg);
        }

        const firstName = document.getElementById('first-name');
        if (firstName.value.trim() === "") {
            triggerError(firstName, "* First name is required");
        }

        const lastName = document.getElementById('last-name');
        if (lastName.value.trim() === "") {
            triggerError(lastName, "* Last name is required");
        }

        const emailAddress = document.getElementById('email-address');
        const emailValue = emailAddress.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (emailValue === "") {
            triggerError(emailAddress, "* Email address is required");
        } else if (!emailRegex.test(emailValue)) {
            triggerError(emailAddress, "* Please enter a valid email address"); 
        }

        const contactInput = document.getElementById('contact-number');
        const contactWrapper = document.querySelector('.phone-input');
        const contactValue = contactInput.value.trim();
        const phoneRegex = /^\d{10}$/; 
        
        if (contactValue === "") {
            triggerError(contactWrapper, "* Contact number is required");
        } else if (!phoneRegex.test(contactValue)) {
            triggerError(contactWrapper, "* Contact number must be exactly 10 digits");
        }

        const sexContainer = document.querySelector('.sex-toggle');
        const selectedSex = document.querySelector('.sex-toggle button.active');
        if (!selectedSex) {
            triggerError(sexContainer, "* Please select your sex");
        }

        const paymentContainer = document.querySelector('.payment-options');
        const selectedPayment = document.querySelector('.payment-options button.active');
        if (!selectedPayment) {
            triggerError(paymentContainer, "* Please choose a payment method");
        }

        if (formIsValid) {
            window.location.href = "booking-process-2.html";
        }
    });