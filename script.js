document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. MOBILE NAVIGATION ENGINE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    
    // Toggle menu state on button click
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the window click listener from instantly closing it
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a link inside it
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu automatically when clicking anywhere else on the page
    document.addEventListener('click', (event) => {
      if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Structural Resize Safeguard (Desktop view clean-up)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) {
        siteNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // 3. DYNAMIC FOOTER YEAR
  // ==========================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 4. CONTACT FORM VALIDATION & SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const form = this;
      const submitBtn = document.getElementById('submitBtn');
      const formStatus = document.getElementById('formStatus');
      let isFormValid = true;

      // Helper function to validate fields safely
      function validateField(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        let isValid = true;

        if (inputElement.required && !inputElement.value.trim()) {
          isValid = false;
        }

        if (inputElement.type === 'email' && inputElement.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(inputElement.value.trim())) {
            isValid = false;
          }
        }

        if (formGroup) {
          if (isValid) {
            formGroup.classList.remove('invalid');
          } else {
            formGroup.classList.add('invalid');
            isFormValid = false;
          }
        }
      }

      const inputsToValidate = form.querySelectorAll('input, select, textarea');
      inputsToValidate.forEach(input => validateField(input));

      if (isFormValid) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
        if (formStatus) {
          formStatus.style.display = 'none';
        }

        const dataPayload = new FormData(form);
        const firstName = dataPayload.get('firstName') || 'there';
        const recipient = dataPayload.get('recipient') || 'General Inquiry';

        // Simulated asynchronous API Call
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
          if (formStatus) {
            formStatus.textContent = `Thank you, ${firstName}! Your inquiry regarding "${recipient}" has been sent successfully.`;
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
          }
          form.reset();
        }, 1500);
      }
    });

    // Real-time cleanup for typing corrections
    document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(element => {
      element.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        if (formGroup && formGroup.classList.contains('invalid') && this.value.trim()) {
          formGroup.classList.remove('invalid');
        }
      });
    });
  }

});