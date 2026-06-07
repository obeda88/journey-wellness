/* Journey - UI Components */

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('modal-overlay');
  
  if (modal) {
    modal.classList.add('show');
    if (overlay) overlay.classList.add('show');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('modal-overlay');
  
  if (modal) {
    modal.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
  }
}

// Setup modal close buttons
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('close-modal');
  const overlay = document.getElementById('modal-overlay');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal('entry-modal'));
  }

  if (overlay) {
    overlay.addEventListener('click', () => closeModal('entry-modal'));
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('entry-modal');
    }
  });
});

// Toast notification
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-slide-in`;
  toast.textContent = message;
  
  const toastStyles = document.createElement('style');
  toastStyles.innerHTML = `
    .toast {
      position: fixed;
      bottom: 24px;
      left: 24px;
      right: 24px;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
    .toast-success {
      background-color: var(--color-happy);
      color: white;
    }
    .toast-error {
      background-color: var(--color-frustrated);
      color: white;
    }
    .toast-info {
      background-color: #5C4033;
      color: white;
    }
  `;
  
  if (!document.querySelector('style[data-toast]')) {
    toastStyles.setAttribute('data-toast', 'true');
    document.head.appendChild(toastStyles);
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Loading spinner
function showLoadingSpinner(show = true) {
  let spinner = document.getElementById('loading-spinner');
  
  if (show) {
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.id = 'loading-spinner';
      spinner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
          <div style="width: 48px; height: 48px; border: 4px solid var(--color-bg-main); border-top-color: var(--color-happy); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
      `;
      spinner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(spinner);
    }
  } else {
    if (spinner) {
      spinner.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => spinner.remove(), 300);
    }
  }
}

// Confirm dialog
function showConfirmDialog(message, onConfirm, onCancel) {
  const dialog = document.createElement('div');
  dialog.className = 'confirm-dialog';
  dialog.innerHTML = `
    <div class="confirm-overlay"></div>
    <div class="confirm-content">
      <p>${message}</p>
      <div class="confirm-buttons">
        <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
        <button class="btn btn-primary" id="confirm-yes">Confirm</button>
      </div>
    </div>
  `;
  
  const style = document.createElement('style');
  style.innerHTML = `
    .confirm-dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .confirm-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .confirm-content {
      position: relative;
      background-color: var(--color-surface);
      padding: 32px 24px;
      border-radius: 16px;
      max-width: 320px;
      text-align: center;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
    .confirm-content p {
      margin-bottom: 24px;
      color: var(--text-dark);
    }
    .confirm-buttons {
      display: flex;
      gap: 12px;
    }
    .confirm-buttons .btn {
      flex: 1;
    }
  `;
  
  if (!document.querySelector('style[data-confirm]')) {
    style.setAttribute('data-confirm', 'true');
    document.head.appendChild(style);
  }
  
  document.body.appendChild(dialog);
  
  const cancelBtn = dialog.querySelector('#confirm-cancel');
  const confirmBtn = dialog.querySelector('#confirm-yes');
  const overlay = dialog.querySelector('.confirm-overlay');
  
  const close = () => dialog.remove();
  
  cancelBtn.addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });
  
  confirmBtn.addEventListener('click', () => {
    close();
    if (onConfirm) onConfirm();
  });
  
  overlay.addEventListener('click', () => {
    close();
    if (onCancel) onCancel();
  });
}

// Initialize UI
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add focus outline for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.style.outlineStyle = 'solid';
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.style.outlineStyle = 'none';
  });
});

// Debounce function for event handlers
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Get element dimensions
function getElementDimensions(element) {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

// Add event delegation helper
function addDelegatedListener(parent, eventType, selector, handler) {
  const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
  if (!parentEl) return;

  parentEl.addEventListener(eventType, (e) => {
    const targetEl = e.target.closest(selector);
    if (targetEl) {
      handler.call(targetEl, e);
    }
  });
}

// Animation helper
function animateElement(element, animationName, duration = 300) {
  return new Promise((resolve) => {
    element.style.animation = `${animationName} ${duration}ms ease-out`;
    setTimeout(() => {
      element.style.animation = '';
      resolve();
    }, duration);
  });
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
