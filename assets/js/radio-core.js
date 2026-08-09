(function () {
  // Auto-rotated tracks (SoundCloud — reliably controllable via the Widget JS API).
  var TRACKS = [
    {
      url: 'https://soundcloud.com/wealthdj/afro-jubilee-mixtape-dj-wealth',
      title: 'Afro-Jubilee Mixtape',
      desc: 'Jubilee rhythm meets Afrobeats, slow-jam cuts, and gospel anthems, feat. Frank Edwards, Lc Beatz, Shola Shittu & Rymsta Ray.'
    },
    {
      url: 'https://soundcloud.com/wealthdj/xtremgospel-mixtape',
      title: 'XtremGospel Mixtape',
      desc: 'Fusion set — gospel bars over hard-hitting production, feat. Dj X-One, Jahdiel, Frank Edwards, Freke Umoh & Mike Abdul.'
    },
    {
      url: 'https://soundcloud.com/wealthdj/unchained-mixtape-dj-wealthdj-x-one-dj-ddavid-dj-berry-dj-josh',
      title: 'Unchained Mixtape',
      desc: 'A four-DJ boom-bap collaboration tape, feat. Dj Berry, Dj D-David, Dj X-One, Dj Josh & Limoblaze.'
    }
  ];

  // Bonus track — Mixcloud only exposes a reliable *manual* embed, not an auto-advance-capable
  // JS API in practice, so it sits outside the automated rotation. Radio page only.
  var BONUS_TRACK = {
    feed: '/omotola-ologunde/church-street-dj-wealth/',
    title: 'Church Street',
    desc: 'Feat. Gaise, Snatcha, Testimony Jaga, Tim Godfrey, Ada, Mike Abdul & Joe Praize. Streaming from Mixcloud — press play manually.'
  };

  var K_IDX = 'wfRadioIdx';
  var K_POS = 'wfRadioPos';
  var K_UNMUTED = 'wfRadioUnmuted';

  function getIdx() {
    var v = Number(sessionStorage.getItem(K_IDX));
    return isFinite(v) && v >= 0 && v < TRACKS.length ? v : 0;
  }
  function setIdx(i) { sessionStorage.setItem(K_IDX, String(i)); }
  function getPosMs() { return Number(sessionStorage.getItem(K_POS) || 0); }
  function setPosMs(ms) { sessionStorage.setItem(K_POS, String(Math.floor(ms))); }
  function isUnmuted() { return sessionStorage.getItem(K_UNMUTED) === '1'; }
  function setUnmuted(v) { sessionStorage.setItem(K_UNMUTED, v ? '1' : '0'); }

  var isRadioPage = !!document.querySelector('.wf-radio__queue');
  var scIframe = null, scWidget = null, scReady = false;
  var bar = null;
  var pendingSeekMs = 0;

  function scEmbedSrc(url) {
    return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) +
      '&auto_play=false&show_artwork=true&visual=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';
  }

  function playIndex(i, seekMs) {
    i = (i + TRACKS.length) % TRACKS.length;
    setIdx(i);
    setPosMs(seekMs || 0);
    if (isRadioPage) showScPlayer();
    if (!scReady) { pendingSeekMs = seekMs || 0; return; }
    var t = TRACKS[i];
    scWidget.load(t.url, {
      show_artwork: true,
      callback: function () {
        scWidget.setVolume(isUnmuted() ? 100 : 0);
        if (seekMs) scWidget.seekTo(seekMs);
        scWidget.play();
        renderUI();
      }
    });
  }

  function advance() { playIndex(getIdx() + 1, 0); }

  function unmute() {
    setUnmuted(true);
    if (scReady) { try { scWidget.setVolume(100); } catch (e) {} }
    renderUI();
  }

  function ensureSC() {
    scIframe = isRadioPage ? document.getElementById('scPlayer') : document.getElementById('scRadioPlayer');
    if (!scIframe) return;
    if (!isRadioPage) scIframe.src = scEmbedSrc(TRACKS[getIdx()].url);
    scWidget = SC.Widget(scIframe);
    scWidget.bind(SC.Widget.Events.READY, function () {
      scReady = true;
      scWidget.bind(SC.Widget.Events.FINISH, function () { advance(); });
      scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, function (data) { setPosMs(data.currentPosition || 0); });
      scWidget.setVolume(isUnmuted() ? 100 : 0);
      playIndex(getIdx(), pendingSeekMs || getPosMs());
    });
  }

  // ---------- UI: persistent mini bar (every page except radio.html) ----------
  function buildBar() {
    var el = document.createElement('div');
    el.className = 'wf-radiobar';
    el.innerHTML =
      '<span class="wf-live"><span class="wf-live__dot" aria-hidden="true"></span>Radio</span>' +
      '<span class="wf-radiobar__title" id="wfRadiobarTitle"></span>' +
      '<button class="wf-btn wf-btn--sm wf-radiobar__unmute" type="button" id="wfRadiobarUnmute">Unmute</button>' +
      '<button class="wf-radiobar__skip" type="button" id="wfRadiobarSkip">Skip &rarr;</button>' +
      '<a class="wf-radiobar__link" href="radio.html">Full Player &rarr;</a>' +
      '<iframe id="scRadioPlayer" title="WealthDJ Radio (background)" allow="autoplay" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;bottom:0" src="about:blank"></iframe>';
    document.body.appendChild(el);
    document.body.classList.add('has-radiobar');
    document.getElementById('wfRadiobarUnmute').addEventListener('click', unmute);
    document.getElementById('wfRadiobarSkip').addEventListener('click', function () { setUnmuted(true); unmute(); advance(); });
    return el;
  }

  function showScPlayer() {
    var scEl = document.getElementById('scPlayer');
    var mcEl = document.getElementById('mcPlayer');
    if (scEl) scEl.style.display = '';
    if (mcEl) mcEl.style.display = 'none';
  }

  function renderUI() {
    var t = TRACKS[getIdx()];
    if (bar) {
      var titleEl = document.getElementById('wfRadiobarTitle');
      if (titleEl) titleEl.textContent = t.title;
      var unmuteBtn = document.getElementById('wfRadiobarUnmute');
      if (unmuteBtn) unmuteBtn.style.display = isUnmuted() ? 'none' : '';
    }
    if (isRadioPage) {
      var titleEl2 = document.getElementById('radioNowTitle');
      var descEl = document.getElementById('radioNowDesc');
      var countEl = document.getElementById('radioCount');
      var unmuteBtn2 = document.getElementById('radioUnmute');
      if (titleEl2) titleEl2.textContent = t.title;
      if (descEl) descEl.textContent = t.desc;
      if (countEl) countEl.textContent = 'Track ' + (getIdx() + 1) + ' of ' + TRACKS.length;
      if (unmuteBtn2) unmuteBtn2.style.display = isUnmuted() ? 'none' : '';
      document.querySelectorAll('.wf-radio__track[data-track-idx]').forEach(function (elx) {
        elx.classList.toggle('is-active', Number(elx.getAttribute('data-track-idx')) === getIdx());
      });
    }
  }

  function playBonus() {
    var mcEl = document.getElementById('mcPlayer');
    var scEl = document.getElementById('scPlayer');
    if (!mcEl) return;
    if (scReady) { try { scWidget.pause(); } catch (e) {} }
    scEl.style.display = 'none';
    mcEl.style.display = '';
    mcEl.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=0&autoplay=1&feed=' + encodeURIComponent(BONUS_TRACK.feed);
    var titleEl = document.getElementById('radioNowTitle');
    var descEl = document.getElementById('radioNowDesc');
    var countEl = document.getElementById('radioCount');
    if (titleEl) titleEl.textContent = BONUS_TRACK.title;
    if (descEl) descEl.textContent = BONUS_TRACK.desc;
    if (countEl) countEl.textContent = 'Bonus track';
    document.querySelectorAll('.wf-radio__track[data-track-idx]').forEach(function (elx) { elx.classList.remove('is-active'); });
    var bonusEl = document.getElementById('radioBonusTrack');
    if (bonusEl) bonusEl.classList.add('is-active');
  }

  function initRadioPage() {
    ensureSC();
    document.querySelectorAll('.wf-radio__track[data-track-idx]').forEach(function (elx) {
      elx.addEventListener('click', function () {
        setUnmuted(true); unmute();
        playIndex(Number(elx.getAttribute('data-track-idx')), 0);
      });
    });
    var bonusEl = document.getElementById('radioBonusTrack');
    if (bonusEl) bonusEl.addEventListener('click', playBonus);
    var nextBtn = document.getElementById('radioNext');
    if (nextBtn) nextBtn.addEventListener('click', function () { setUnmuted(true); unmute(); advance(); });
    var unmuteBtn = document.getElementById('radioUnmute');
    if (unmuteBtn) unmuteBtn.addEventListener('click', unmute);
    renderUI();
  }

  function initBar() {
    bar = buildBar();
    ensureSC();
    renderUI();
  }

  function init() {
    if (typeof SC === 'undefined') { window.addEventListener('load', init); return; }
    if (isRadioPage) initRadioPage(); else initBar();
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();
