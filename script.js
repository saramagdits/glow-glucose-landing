/**
 * Glow Glucose Landing Page Scripts
 * Handles form submission to Formspark and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initWaitlistForm();
  initSmoothScroll();
});

/**
 * Initialize waitlist form with Formspark + Botpoison integration
 * Documentation: https://documentation.formspark.io
 * Botpoison: https://botpoison.com/documentation/getting-started/javascript/
 */
function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  const emailInput = document.getElementById('email-input');
  const buttonText = form.querySelector('.button-text');
  const buttonLoading = form.querySelector('.button-loading');
  const formSuccess = document.getElementById('form-success');
  const submitButton = form.querySelector('button');

  // Get public key from form attribute
  const publicKey = form.dataset.botpoisonPublicKey;

  // Initialize Botpoison programmatically
  const botpoison = new Botpoison({ publicKey });

  async function handleSubmit() {
    const email = emailInput.value.trim();
    if (!email) {
      emailInput.focus();
      return;
    }

    // Basic email validation
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    // Show loading state
    buttonText.hidden = true;
    buttonLoading.classList.add('show');
    submitButton.disabled = true;

    try {
      // Get botpoison challenge solution
      const { solution } = await botpoison.challenge();

      // Submit to Formspark with botpoison token
      const response = await fetch(form.dataset.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          _botpoison: solution,
        }),
      });

      if (response.ok) {
        // Success - show confirmation
        form.hidden = true;
        formSuccess.hidden = false;

        // Track conversion (if analytics is set up)
        if (typeof gtag === 'function') {
          gtag('event', 'sign_up', {
            method: 'waitlist',
          });
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error);

      // Reset button state
      buttonText.hidden = false;
      buttonLoading.classList.remove('show');
      submitButton.disabled = false;

      // Show error message
      alert('Something went wrong. Please try again.');
    }
  }

  submitButton.addEventListener('click', handleSubmit);
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * Optional: Add intersection observer for fade-in animations
 * Uncomment if you want elements to fade in as they scroll into view
 */
/*
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .waitlist-card').forEach(el => {
    observer.observe(el);
  });
}
*/
