/* =============================================
   CORRETOR QUE VENDE — script.js
   ============================================= */

/* ---------- DATA EM TEMPO REAL NA FITA ---------- */
(function () {
  function updateRibbonDate() {
    var el = document.getElementById('offer-ribbon-date');
    if (!el) return;
    var now = new Date();
    var day   = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var year  = now.getFullYear();
    el.textContent = 'Oferta válida até ' + day + '/' + month + '/' + year;
  }
  updateRibbonDate();
  // Atualiza à meia-noite
  var now = new Date();
  var msUntilMidnight = (
    (23 - now.getHours()) * 3600000 +
    (59 - now.getMinutes()) * 60000 +
    (60 - now.getSeconds()) * 1000
  );
  setTimeout(function () {
    updateRibbonDate();
    setInterval(updateRibbonDate, 86400000);
  }, msUntilMidnight);
})();

/* ---------- INTERSECTION OBSERVER — FADE UP ---------- */
(function () {
  var elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -30px 0px' }
  );
  elements.forEach(function (el) { observer.observe(el); });
})();

/* ---------- ACCORDION FAQ ---------- */
(function () {
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      items.forEach(function (i) {
        i.classList.remove('open');
        var ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        var answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ---------- VSL PLAYER (lazy load + play/pause) ---------- */
(function () {
  var player    = document.getElementById('vslPlayer');
  var overlay   = document.getElementById('vslOverlay');
  var video     = document.getElementById('vslVideo');
  var toggleBtn = document.getElementById('vslToggleBtn');
  if (!player || !overlay || !video || !toggleBtn) return;

  var controlsTimer = null;

  function showControls() {
    player.classList.add('show-controls');
    clearTimeout(controlsTimer);
    controlsTimer = setTimeout(function () {
      if (!video.paused) player.classList.remove('show-controls');
    }, 2500);
  }

  function setPlayingState(playing) {
    if (playing) {
      player.classList.add('playing');
    } else {
      player.classList.remove('playing');
      player.classList.add('show-controls');
    }
  }

  /* Primeiro clique: carrega e inicia o vídeo */
  overlay.addEventListener('click', function () {
    video.src = '/vsl.mp4';
    video.style.display = 'block';
    overlay.style.display = 'none';
    video.play();
    setPlayingState(true);
    showControls();
  });

  /* Clique no vídeo: mostra controles temporariamente */
  video.addEventListener('click', function () {
    showControls();
  });

  /* Clique no botão toggle: play / pause */
  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      setPlayingState(true);
      showControls();
    } else {
      video.pause();
      setPlayingState(false);
    }
  });

  /* Sincroniza estado ao terminar o vídeo */
  video.addEventListener('ended', function () {
    setPlayingState(false);
  });

  /* Toque no player (mobile): exibe controles */
  player.addEventListener('touchstart', function () {
    showControls();
  }, { passive: true });
})();

/* ---------- SMOOTH SCROLL ---------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
