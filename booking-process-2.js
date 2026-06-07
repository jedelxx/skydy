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
      const doneBtn = document.querySelector('.btn-done');
      const confirmationModal = document.getElementById('confirmationModal');
      const returnBtn = document.querySelector('.btn-return');
      
      doneBtn.addEventListener('click', function() {
          const refInput = document.getElementById('reference-number');
          
          document.querySelectorAll('.error-text').forEach(msg => msg.remove());
          refInput.classList.remove('error-border');
          
          if(refInput.value.trim() === "") {
              refInput.classList.add('error-border');
              const warningMsg = document.createElement('span');
              warningMsg.className = 'error-text';
              warningMsg.innerText = "* Reference number is required";
              refInput.insertAdjacentElement('afterend', warningMsg);
          } else {
              confirmationModal.style.display = 'flex';
          }
      });

      returnBtn.addEventListener('click', function() {
          window.location.href = "index.html"; 
      });