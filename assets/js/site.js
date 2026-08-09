(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var toggle = document.querySelector('.wf-nav__toggle');
  var links = document.querySelector('.wf-nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('is-open'); });
    });
  }

  var here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.wf-nav__links a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === here || (href === 'index.html' && here === '')) a.setAttribute('aria-current', 'page');
  });

  var revealEls = document.querySelectorAll('.rv');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function (el) { ro.observe(el); });
    }
  }

  var cursor = document.querySelector('.wf-cursor');
  var cursorDot = document.querySelector('.wf-cursor-dot');
  if (cursor && cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      cursorDot.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
    document.querySelectorAll('a, button, input').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('wf-cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('wf-cursor-hover'); });
    });
  }

  var scrubFill = document.querySelector('.wf-scrubber__fill');
  var chapterEl = document.querySelector('.wf-chapter');
  var pageLabel = document.body.getAttribute('data-page-label') || document.title;
  if (scrubFill || chapterEl) {
    var scrubTicking = false;
    function updateScrub() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (scrubFill) scrubFill.style.width = pct.toFixed(2) + '%';
      if (chapterEl) chapterEl.innerHTML = 'Now Reading &middot; <strong>' + pageLabel + '</strong>';
      scrubTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!scrubTicking) { requestAnimationFrame(updateScrub); scrubTicking = true; }
    }, { passive: true });
    updateScrub();
  }

  document.querySelectorAll('[data-filter-input]').forEach(function (input) {
    var targetSel = input.getAttribute('data-filter-input');
    var items = Array.prototype.slice.call(document.querySelectorAll(targetSel));
    var countEl = document.querySelector(input.getAttribute('data-filter-count') || '');
    function apply() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (item) {
        var text = (item.getAttribute('data-filter-text') || item.textContent).toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        item.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? ' result' : ' results');
    }
    input.addEventListener('input', apply);
    apply();
  });

  var nlForm = document.getElementById('nlForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('nlEmail').value.trim();
      window.location.href = 'mailto:howzstd@gmail.com?subject=' + encodeURIComponent('Tape drop list') + '&body=' + encodeURIComponent('Add me to the list: ' + email);
    });
  }
})();
