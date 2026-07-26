// ══════════════════════════════════════════════════════════════════════════
// Soldaduras Becker — WhatsApp, menú móvil, filtros del cuaderno y visor.
// Sin dependencias. Se carga al final del <body>.
// ══════════════════════════════════════════════════════════════════════════

// ── Links de WhatsApp ─────────────────────────────────────────────────────
document.querySelectorAll('[data-wa]').forEach(function (el) {
  var num = el.getAttribute('data-wa');
  var msg = el.getAttribute('data-msg') || 'Hola, quiero más información.';
  el.setAttribute('href', 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg));
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

// ── Año en el pie ─────────────────────────────────────────────────────────
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ── Menú móvil ────────────────────────────────────────────────────────────
var toggle = document.querySelector('.site-head__toggle');
var menu = document.getElementById('menu');
if (toggle && menu) {
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Filtros + visor del cuaderno ──────────────────────────────────────────
var masonry = document.querySelector('.masonry');
if (masonry) {
  var piezas = Array.prototype.slice.call(masonry.querySelectorAll('.pieza'));

  // Filtros
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filtro');
      document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      piezas.forEach(function (p) {
        var cats = (p.getAttribute('data-cat') || '').split(' ');
        p.hidden = !(f === 'todo' || cats.indexOf(f) > -1);
      });
    });
  });

  function visibles() {
    return piezas.filter(function (p) { return !p.hidden; });
  }

  // Visor
  var visor = document.createElement('div');
  visor.className = 'visor';
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.innerHTML =
    '<div class="visor__caja">' +
      '<div class="visor__foto"><img alt="" /></div>' +
      '<div class="visor__info">' +
        '<div class="visor__top">' +
          '<span class="visor__n"></span>' +
          '<span class="visor__pos"></span>' +
          '<button class="visor__cerrar" type="button" aria-label="Cerrar">×</button>' +
        '</div>' +
        '<h2></h2>' +
        '<dl>' +
          '<div class="visor__fila"><dt>Material</dt><dd class="visor__material"></dd></div>' +
          '<div class="visor__fila"><dt>Medidas</dt><dd>A medida de tu espacio</dd></div>' +
        '</dl>' +
        '<a class="btn btn-primary btn-block visor__wa" href="#" target="_blank" rel="noopener">Quiero uno así →</a>' +
        '<p class="visor__nota">Se abre WhatsApp con el número de la pieza ya escrito.</p>' +
        '<div class="visor__nav">' +
          '<button type="button" class="visor__prev">← Anterior</button>' +
          '<button type="button" class="visor__next">Siguiente →</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(visor);

  var vImg = visor.querySelector('img');
  var vN = visor.querySelector('.visor__n');
  var vPos = visor.querySelector('.visor__pos');
  var vTitulo = visor.querySelector('h2');
  var vMaterial = visor.querySelector('.visor__material');
  var vWa = visor.querySelector('.visor__wa');
  var actual = null;

  function mostrar(pieza) {
    var lista = visibles();
    var pos = lista.indexOf(pieza);
    if (pos < 0) return;
    actual = pieza;
    var img = pieza.querySelector('img');
    var n = pieza.getAttribute('data-n');
    var tipo = pieza.getAttribute('data-tipo');
    vImg.setAttribute('src', img.getAttribute('src'));
    vImg.setAttribute('alt', img.getAttribute('alt') || '');
    vN.textContent = 'N.º ' + n;
    vPos.textContent = (pos + 1) + ' de ' + lista.length;
    vTitulo.textContent = tipo;
    vMaterial.textContent = pieza.getAttribute('data-material');
    vWa.setAttribute('href', 'https://wa.me/56953910713?text=' + encodeURIComponent(
      'Hola José, vi la pieza N.º ' + n + ' de su cuaderno (' + tipo + ') y quiero una parecida. ¿Me la puede cotizar?'
    ));
    visor.classList.add('is-open');
  }

  function mover(d) {
    var lista = visibles();
    var pos = lista.indexOf(actual);
    if (pos < 0) return;
    mostrar(lista[(pos + d + lista.length) % lista.length]);
  }

  function cerrar() { visor.classList.remove('is-open'); }

  piezas.forEach(function (p) {
    p.querySelector('.pieza__foto').addEventListener('click', function () { mostrar(p); });
  });

  visor.querySelector('.visor__cerrar').addEventListener('click', cerrar);
  visor.querySelector('.visor__prev').addEventListener('click', function () { mover(-1); });
  visor.querySelector('.visor__next').addEventListener('click', function () { mover(1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });

  document.addEventListener('keydown', function (e) {
    if (!visor.classList.contains('is-open')) return;
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowLeft') mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  });

  // Swipe en móvil
  var x0 = null;
  visor.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
}
