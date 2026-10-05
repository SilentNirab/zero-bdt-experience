/**
 * Orbix Runtime Engine
 * Powers interactive features, brand consistency, loader transitions, and form handling for Orbix University.
 */
(() => {
  'use strict';

  // 1. Smooth Loader Transition & Brand Presentation
  const initLoader = () => {
    const loader = document.querySelector('.framer-8oses-container');
    if (!loader) return;

    loader.innerHTML = `
      <div style="width: 100%; height: 100%; background-color: rgb(14, 137, 90); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
        <img src="/assets/images/orbix-monogram.png" alt="Orbix" style="width: 74px; height: 74px; border-radius: 20px; box-shadow: 0 12px 36px rgba(0,0,0,0.25); animation: orbixPulse 1.1s ease-in-out infinite alternate;" />
        <span style="font-family: 'Google Sans Flex', -apple-system, sans-serif; font-size: 34px; font-weight: 700; color: #ffffff; letter-spacing: -0.03em;">ORBIX</span>
      </div>
      <style>
        @keyframes orbixPulse {
          0% { transform: scale(0.96); opacity: 0.88; }
          100% { transform: scale(1.04); opacity: 1; }
        }
      </style>
    `;

    setTimeout(() => {
      loader.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      loader.style.opacity = '0';
      loader.style.transform = 'scale(1.04)';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.remove();
      }, 700);
    }, 1100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }

  // 2. Text Replacement Observer to guarantee 100% brand fidelity
  const replaceTextInNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue && (/zero/i.test(node.nodeValue))) {
        node.nodeValue = node.nodeValue
          .replace(/\bZERO\b/g, 'ORBIX')
          .replace(/\bZero\b/g, 'Orbix')
          .replace(/zero\.university/gi, 'orbix.university');
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(node.tagName)) return;

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

  if (document.body) {
    replaceTextInNode(document.body);
    updateTitle();
  }

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

  // 3. Interactive Form & Waitlist Submission Handler
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

    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
    }
  }, true);

  // 4. Clean Internal Link Navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.includes('zero.university')) {
      e.preventDefault();
      const localPath = href.replace(/^https?:\/\/(?:www\.)?zero\.university/, '') || '/';
      window.location.href = localPath;
    }
  }, true);

  console.log('[Orbix] Runtime initialized successfully.');
})();
