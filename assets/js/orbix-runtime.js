/**
 * Orbix Runtime Engine
 * Powers interactive features, brand consistency, and form handling for Orbix University.
 */
(() => {
  'use strict';

  // 1. Text Replacement Observer to guarantee 100% brand fidelity
  const replaceTextInNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue && (/zero/i.test(node.nodeValue))) {
        node.nodeValue = node.nodeValue
          .replace(/\bZERO\b/g, 'ORBIX')
          .replace(/\bZero\b/g, 'Orbix')
          .replace(/zero\.university/gi, 'orbix.university');
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Don't modify raw scripts or styles
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(node.tagName)) return;

      // Check placeholder or title attributes
      if (node.hasAttribute('placeholder') && /zero/i.test(node.getAttribute('placeholder'))) {
        node.setAttribute('placeholder', node.getAttribute('placeholder').replace(/zero/gi, 'Orbix'));
      }
      if (node.hasAttribute('title') && /zero/i.test(node.getAttribute('title'))) {
        node.setAttribute('title', node.getAttribute('title').replace(/zero/gi, 'Orbix'));
      }
      if (node.hasAttribute('alt') && /zero/i.test(node.getAttribute('alt'))) {
        node.setAttribute('alt', node.getAttribute('alt').replace(/zero/gi, 'Orbix'));
      }

      for (let child = node.firstChild; child; child = child.nextSibling) {
        replaceTextInNode(child);
      }
    }
  };

  const updateTitle = () => {
    if (document.title && /zero/i.test(document.title)) {
      document.title = document.title
        .replace(/\bZERO\b/g, 'ORBIX')
        .replace(/\bZero\b/g, 'Orbix');
    }
  };

  // Run on initial load
  if (document.body) {
    replaceTextInNode(document.body);
    updateTitle();
  }

  // Observe ongoing DOM changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const added of mutation.addedNodes) {
        replaceTextInNode(added);
      }
    }
    updateTitle();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // 2. Interactive Form & Waitlist Submission Handler
  document.addEventListener('submit', (e) => {
    const form = e.target;
    e.preventDefault();

    const inputs = form.querySelectorAll('input');
    const formData = {};
    inputs.forEach(inp => {
      if (inp.name || inp.type) {
        formData[inp.name || inp.type] = inp.value;
      }
    });

    console.log('[Orbix] Form submitted:', formData);

    try {
      const existing = JSON.parse(localStorage.getItem('orbix_leads') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('orbix_leads', JSON.stringify(existing));
    } catch (_) {}

    // Find submit button or form container to show confirmation
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]') || form.querySelector('button');
    if (submitBtn) {
      const originalText = submitBtn.textContent || 'Submit';
      submitBtn.textContent = 'Welcome to Orbix! ✓';
      submitBtn.style.backgroundColor = '#10b981';
      submitBtn.style.color = '#ffffff';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
      }, 4000);
    }

    // Trigger celebration confetti if available
    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
    }
  }, true);

  // 3. Ensure clean link handling
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Convert any hardcoded zero links
    if (href.includes('zero.university')) {
      e.preventDefault();
      const localPath = href.replace(/^https?:\/\/(?:www\.)?zero\.university/, '') || '/';
      window.location.href = localPath;
    }
  }, true);

  console.log('[Orbix] Runtime initialized successfully.');
})();
