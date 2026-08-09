(function () {
  var iframe = document.getElementById('scPlayer');
  if (!iframe) return;

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

  var idx = 0;
  var widget = null;
  var titleEl = document.getElementById('radioNowTitle');
  var descEl = document.getElementById('radioNowDesc');
  var countEl = document.getElementById('radioCount');
  var trackButtons = document.querySelectorAll('.wf-radio__track');

  function render() {
    trackButtons.forEach(function (el) {
      el.classList.toggle('is-active', Number(el.getAttribute('data-track-idx')) === idx);
    });
    if (titleEl) titleEl.textContent = TRACKS[idx].title;
    if (descEl) descEl.textContent = TRACKS[idx].desc;
    if (countEl) countEl.textContent = 'Track ' + (idx + 1) + ' of ' + TRACKS.length;
  }

  function playIndex(i) {
    idx = (i + TRACKS.length) % TRACKS.length;
    render();
    widget.load(TRACKS[idx].url, { auto_play: true, show_artwork: true, visual: false });
  }

  function init() {
    if (typeof SC === 'undefined') return;
    widget = SC.Widget(iframe);
    widget.bind(SC.Widget.Events.FINISH, function () { playIndex(idx + 1); });

    trackButtons.forEach(function (el) {
      el.addEventListener('click', function () {
        playIndex(Number(el.getAttribute('data-track-idx')));
      });
    });

    var nextBtn = document.getElementById('radioNext');
    if (nextBtn) nextBtn.addEventListener('click', function () { playIndex(idx + 1); });

    render();
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
