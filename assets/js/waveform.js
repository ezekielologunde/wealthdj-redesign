(function () {
  var canvas = document.getElementById('wf-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H, DPR;
  var bars = [];
  var playing = false;

  var COLORS = [
    [139, 92, 246],
    [255, 61, 154],
    [255, 202, 58],
    [77, 238, 255]
  ];

  function lerpColor(t) {
    var seg = t * (COLORS.length - 1);
    var i = Math.min(COLORS.length - 2, Math.floor(seg));
    var f = seg - i;
    var a = COLORS[i], b = COLORS[i + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f)
    ];
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initBars();
  }

  function initBars() {
    var count = Math.max(28, Math.min(72, Math.floor(W / 22)));
    bars = Array.from({ length: count }, function (_, i) {
      return {
        target: 0.08 + Math.random() * 0.1,
        cur: 0.08,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02,
        color: lerpColor(i / (count - 1))
      };
    });
  }

  var energy = 0;
  var heroEl = null;

  function step() {
    var t = Date.now() / 1000;
    var sum = 0;
    for (var i = 0; i < bars.length; i++) {
      var b = bars[i];
      if (playing) {
        if (Math.random() < 0.04) b.target = 0.12 + Math.random() * 0.85;
      } else {
        b.target = 0.06 + (Math.sin(t * 0.6 + b.phase) * 0.5 + 0.5) * 0.1;
      }
      b.cur += (b.target - b.cur) * (playing ? 0.18 : 0.05);
      sum += b.cur;
    }
    var avg = sum / bars.length;
    energy += (avg - energy) * 0.12;

    if (!heroEl) heroEl = document.querySelector('.wf-hero__name');
    if (heroEl) {
      var glow = 6 + energy * 46;
      var scale = 1 + energy * 0.018;
      heroEl.style.filter = 'drop-shadow(0 0 ' + glow.toFixed(1) + 'px rgba(255,202,58,' + Math.min(0.55, energy * 0.6).toFixed(2) + '))';
      heroEl.style.transform = 'scale(' + scale.toFixed(4) + ')';
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var baseline = H * 0.94;
    var gap = W / bars.length;
    var maxH = H * (playing ? 0.5 : 0.22);

    for (var i = 0; i < bars.length; i++) {
      var b = bars[i];
      var barH = b.cur * maxH;
      var x = i * gap + gap * 0.22;
      var w = gap * 0.56;
      var alpha = playing ? 0.5 : 0.22;
      var grad = ctx.createLinearGradient(0, baseline, 0, baseline - barH);
      grad.addColorStop(0, 'rgba(' + b.color.join(',') + ',' + alpha + ')');
      grad.addColorStop(1, 'rgba(' + b.color.join(',') + ',0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, baseline - barH, w, barH);
    }
  }

  function tick() {
    step();
    draw();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();

  if (reduceMotion) {
    draw();
  } else {
    tick();
  }

  function bindSoundCloud() {
    var iframe = document.getElementById('scPlayer');
    if (!iframe || typeof SC === 'undefined') return;
    var widget = SC.Widget(iframe);
    widget.bind(SC.Widget.Events.PLAY, function () { playing = true; });
    widget.bind(SC.Widget.Events.PAUSE, function () { playing = false; });
    widget.bind(SC.Widget.Events.FINISH, function () { playing = false; });
  }

  if (document.readyState === 'complete') {
    bindSoundCloud();
  } else {
    window.addEventListener('load', bindSoundCloud);
  }
})();
