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
    var cx = 0, cy = 0;
    window.addEventListener('pointermove', function (e) {
      cx = e.clientX; cy = e.clientY;
      cursorDot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    });
    document.querySelectorAll('a, button, input').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('wf-cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('wf-cursor-hover'); });
    });
  }

  var scrubFill = document.querySelector('.wf-scrubber__fill');
  var chapterEl = document.querySelector('.wf-chapter');
  var chapters = [
    { id: 'top', label: 'Intro' },
    { id: 'spinning', label: 'Now Spinning' },
    { id: 'sound', label: 'The Sound' },
    { id: 'ensemble', label: 'The Ensemble' },
    { id: 'booking', label: 'Booking' },
    { id: 'channels', label: 'Channels' }
  ].map(function (c) { return { el: document.getElementById(c.id), label: c.label }; }).filter(function (c) { return c.el; });

  if (scrubFill || chapterEl) {
    var scrubTicking = false;
    function updateScrub() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (scrubFill) scrubFill.style.width = pct.toFixed(2) + '%';
      if (chapterEl && chapters.length) {
        var current = chapters[0];
        for (var i = 0; i < chapters.length; i++) {
          if (chapters[i].el.getBoundingClientRect().top < window.innerHeight * 0.5) current = chapters[i];
        }
        chapterEl.innerHTML = 'Now Reading &middot; <strong>' + current.label + '</strong>';
      }
      scrubTicking = false;
    }
    window.addEventListener('scroll', function () {
      if (!scrubTicking) { requestAnimationFrame(updateScrub); scrubTicking = true; }
    }, { passive: true });
    updateScrub();
  }

  var nlForm = document.getElementById('nlForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('nlEmail').value.trim();
      window.location.href = 'mailto:howzstd@gmail.com?subject=' + encodeURIComponent('Tape drop list') + '&body=' + encodeURIComponent('Add me to the list: ' + email);
    });
  }
})();
