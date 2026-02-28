const nav = document.querySelector('#site-nav');
const menuToggle = nav ? document.querySelector(`.menu-toggle[aria-controls="${nav.id}"]`) : null;

if (menuToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 940) {
      closeMenu();
    }
  });
}

const widgetTriggers = document.querySelectorAll('[data-menu-widget-trigger]');

widgetTriggers.forEach((trigger) => {
  const modalId = trigger.getAttribute('data-menu-widget-trigger');
  if (!modalId) {
    return;
  }

  const modal = document.getElementById(modalId);
  if (!(modal instanceof HTMLDialogElement)) {
    return;
  }

  const closeButton = modal.querySelector('[data-menu-widget-close]');
  const slideButtons = modal.querySelectorAll('[data-slide-target]');
  const slideFrames = modal.querySelectorAll('[data-slide-frame]');

  const showSlide = (targetName) => {
    slideFrames.forEach((slideFrame) => {
      const frameName = slideFrame.getAttribute('data-slide-frame');
      slideFrame.hidden = frameName !== targetName;
    });

    slideButtons.forEach((slideButton) => {
      const buttonName = slideButton.getAttribute('data-slide-target');
      const isActive = buttonName === targetName;
      slideButton.setAttribute('aria-pressed', String(isActive));
    });
  };

  slideButtons.forEach((slideButton) => {
    slideButton.addEventListener('click', () => {
      const targetName = slideButton.getAttribute('data-slide-target');
      if (targetName) {
        showSlide(targetName);
      }
    });
  });

  trigger.addEventListener('click', () => {
    const defaultTarget = slideButtons[0]?.getAttribute('data-slide-target') || slideFrames[0]?.getAttribute('data-slide-frame');
    if (defaultTarget) {
      showSlide(defaultTarget);
    }
    modal.showModal();
  });

  closeButton?.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (event) => {
    const bounds = modal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      modal.close();
    }
  });
});


const signupForm = document.querySelector('[data-signup-form]');

if (signupForm instanceof HTMLFormElement) {
  const submitButton = signupForm.querySelector('[data-signup-submit]');
  const messageNode = signupForm.querySelector('[data-signup-message]');
  const sourceField = signupForm.querySelector('[data-signup-source]');
  const actionUrl = signupForm.getAttribute('action') || '/api/subscribe';
  const parsedActionUrl = new URL(actionUrl, window.location.origin);
  const isGoogleFormEndpoint =
    parsedActionUrl.hostname === 'docs.google.com' && parsedActionUrl.pathname.includes('/forms/');

  if (isGoogleFormEndpoint) {
    signupForm.querySelectorAll('[data-google-entry]').forEach((field) => {
      if (!(field instanceof HTMLInputElement)) {
        return;
      }

      const googleEntry = field.getAttribute('data-google-entry');
      if (googleEntry && googleEntry.startsWith('entry.')) {
        field.setAttribute('name', googleEntry);
      }
    });
  }

  if (sourceField instanceof HTMLInputElement) {
    sourceField.value = window.location.pathname || '/';
  }

  const setMessage = (message, state = '') => {
    if (!(messageNode instanceof HTMLElement)) {
      return;
    }

    messageNode.textContent = message;
    if (state) {
      messageNode.setAttribute('data-state', state);
    } else {
      messageNode.removeAttribute('data-state');
    }
  };

  signupForm.addEventListener('submit', async (event) => {
    if (!signupForm.reportValidity()) {
      event.preventDefault();
      setMessage('Please complete the required fields to subscribe.', 'error');
      return;
    }

    if (isGoogleFormEndpoint) {
      setMessage('Sending your signup to our newsletter sheet...');
      return;
    }

    event.preventDefault();

    const endpoint = actionUrl;
    const formData = new FormData(signupForm);

    signupForm.setAttribute('data-busy', 'true');
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
    }
    setMessage('Submitting your request...');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
      const payload = await response.json().catch(() => null);
      const responseMessage = payload && typeof payload.message === 'string'
        ? payload.message
        : 'We could not process your signup right now. Please try again.';

      if (!response.ok) {
        setMessage(responseMessage, 'error');
        return;
      }

      signupForm.reset();
      if (sourceField instanceof HTMLInputElement) {
        sourceField.value = window.location.pathname || '/';
      }
      setMessage(responseMessage, 'success');
    } catch (error) {
      setMessage('A network issue prevented signup. Please try again in a moment.', 'error');
    } finally {
      signupForm.removeAttribute('data-busy');
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
      }
    }
  });
}
