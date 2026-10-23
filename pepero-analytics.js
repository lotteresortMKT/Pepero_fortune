(function () {
  'use strict';

  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwQhhLEm76A-qSeF_-s4_3mvZYFGaNz7lzHgt-i7XWKrePGnS9gpdpSsT-TY_bnI1kotw/exec';
  const VISITOR_KEY = 'pepero-fortune-visitor-id';

  function visitorId() {
    try {
      let id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);
        localStorage.setItem(VISITOR_KEY, id);
      }
      return id;
    } catch (_) {
      return '';
    }
  }

  function track(event) {
    const body = JSON.stringify({
      event,
      visitor_id: visitorId(),
      path: window.location.pathname,
      user_agent: navigator.userAgent
    });
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      keepalive: true,
      mode: 'no-cors'
    }).catch(() => {});
  }

  window.addEventListener('load', () => {
    track('page_view');
    document.getElementById('rewardsLink')?.addEventListener('click', () => track('rewards_click'));
    document.getElementById('shareEvent')?.addEventListener('click', () => track('share'));
    document.getElementById('saveResultImage')?.addEventListener('click', () => track('image_save'));
  }, { once: true });
})();
