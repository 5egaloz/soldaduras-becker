// Arma los links de WhatsApp a partir de data-wa (número) y data-msg (mensaje).
// Así solo cambias el número en el HTML y todos los botones funcionan.
document.querySelectorAll('[data-wa]').forEach(function (el) {
  var num = el.getAttribute('data-wa');
  var msg = encodeURIComponent(el.getAttribute('data-msg') || 'Hola, quiero más información.');
  el.setAttribute('href', 'https://wa.me/' + num + '?text=' + msg);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

// Año automático en el footer
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ====== Menú móvil (hamburguesa) ======
var navToggle = document.querySelector('.nav__toggle');
var navMenu = document.getElementById('menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Cerrar el menú al tocar cualquier link
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ====== Lightbox de la galería (solo si hay galería en la página) ======
var gallery = document.querySelector('.gallery');
if (gallery) {
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<button class="lightbox__close" type="button" aria-label="Cerrar">×</button><img alt="">';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');

  gallery.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.setAttribute('src', img.getAttribute('src'));
      lbImg.setAttribute('alt', img.getAttribute('alt') || '');
      lb.classList.add('is-open');
    });
  });

  function closeLightbox() { lb.classList.remove('is-open'); }
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox();
  });
}
