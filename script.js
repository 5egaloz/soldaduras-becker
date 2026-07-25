// ====== Links de WhatsApp ======
function updateWhatsAppLinks(lang) {
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var num = el.getAttribute('data-wa');
    var msgAttr = (lang === 'en' && el.getAttribute('data-msg-en')) ? 'data-msg-en' : 'data-msg';
    var defaultMsg = (lang === 'en') ? 'Hello, I would like to get a custom quote.' : 'Hola, quiero más información.';
    var msg = encodeURIComponent(el.getAttribute(msgAttr) || defaultMsg);
    el.setAttribute('href', 'https://wa.me/' + num + '?text=' + msg);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}
updateWhatsAppLinks(localStorage.getItem('lang') || 'es');

// ====== Año automático en el footer ======
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
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ====== Selector de Idioma (Español / Inglés) ======
(function initLanguageSelector() {
  var currentLang = localStorage.getItem('lang') || 'es';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Actualizar textos con atributo data-i18n-en / data-i18n-es
    document.querySelectorAll('[data-i18n-en]').forEach(function (el) {
      if (lang === 'en') {
        if (!el.hasAttribute('data-i18n-es')) el.setAttribute('data-i18n-es', el.textContent.trim());
        el.textContent = el.getAttribute('data-i18n-en');
      } else if (el.hasAttribute('data-i18n-es')) {
        el.textContent = el.getAttribute('data-i18n-es');
      }
    });

    // Actualizar estado activo de los botones de idioma
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    updateWhatsAppLinks(lang);
  }

  // Insertar selector en la barra de navegación si existe el menú
  if (navMenu) {
    var selector = document.createElement('div');
    selector.className = 'lang-selector';
    selector.innerHTML = '<button type="button" class="lang-btn" data-lang="es">ES</button><button type="button" class="lang-btn" data-lang="en">EN</button>';
    navMenu.appendChild(selector);

    selector.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(this.getAttribute('data-lang'));
      });
    });
  }

  applyLanguage(currentLang);
})();

// ====== Lightbox Mejorado (Flechas + Teclado + Contador + Swipe) ======
var gallery = document.querySelector('.gallery');
if (gallery) {
  var items = Array.from(gallery.querySelectorAll('img'));
  var currentIndex = 0;

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<div class="lightbox__content">' +
    '<button class="lightbox__close" type="button" aria-label="Cerrar">×</button>' +
    '<img alt="">' +
    '<div class="lightbox__nav">' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Anterior">❮</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Siguiente">❯</button>' +
    '</div>' +
    '<div class="lightbox__counter"></div>' +
  '</div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector('img');
  var lbCounter = lb.querySelector('.lightbox__counter');

  function showImage(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;
    var targetImg = items[currentIndex];
    lbImg.setAttribute('src', targetImg.getAttribute('src'));
    lbImg.setAttribute('alt', targetImg.getAttribute('alt') || '');
    lbCounter.textContent = (currentIndex + 1) + ' / ' + items.length;
  }

  items.forEach(function (img, idx) {
    img.addEventListener('click', function () {
      showImage(idx);
      lb.classList.add('is-open');
    });
  });

  function closeLightbox() { lb.classList.remove('is-open'); }

  lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox__prev').addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  lb.querySelector('.lightbox__next').addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lightbox__content')) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

