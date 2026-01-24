/**
 * Glow Glucose Landing Page Scripts
 * Handles form submission to Formspark and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initWaitlistForm();
  initSmoothScroll();
});

/**
 * Initialize waitlist form with Formspark integration
 * Documentation: https://documentation.formspark.io
 */
function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('email-input');
  const buttonText = form.querySelector('.button-text');
  const buttonLoading = form.querySelector('.button-loading');
  const formSuccess = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) return;

    // Show loading state
    buttonText.hidden = true;
    buttonLoading.hidden = false;
    form.querySelector('button').disabled = true;

    try {
      // Submit to Formspark
      // Replace YOUR_FORMSPARK_ID with your actual Formspark form ID
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
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
      buttonLoading.hidden = true;
      form.querySelector('button').disabled = false;

      // Show error message (could be enhanced with a toast notification)
      alert('Something went wrong. Please try again.');
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
